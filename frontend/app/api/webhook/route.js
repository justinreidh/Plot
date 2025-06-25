import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'
import { adminDB } from '../../../lib/firebase-admin' 

export const config = {
    api: {
        bodyParser: false, 
    },
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req) {
    const rawBody = await req.text()
    const sig = req.headers.get('stripe-signature')

    let event

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret)
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message)
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        const userId = session.metadata?.userId
        const customerId = session.customer
        const subscriptionId = session.subscription
        try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId)
            console.log("Subscription info geted:", subscription)
            await adminDB.collection('users').doc(userId).set(
                {
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscriptionId,
                subscriptionStatus: subscription.status,
                subscriptionRenewal: subscription.start_date * 1000
                },
                { merge: true }
            )

            console.log(`Firestore updated for user ${userId}`)
        } catch (error) {
            console.error('Failed to write to Firestore:', error)
        }
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object
        const customerId = subscription.customer

        const usersRef = adminDB.collection('users')
        const matchingUsers = await usersRef.where('stripeCustomerId', '==', customerId).get()

        if (!matchingUsers.empty) {
            const userDoc = matchingUsers.docs[0]

            await userDoc.ref.update({
            subscriptionStatus: 'canceled',
            subscriptionRenewal: null, 
            })

            console.log(`Subscription canceled for user: ${userDoc.id}`)
        } else {
            console.warn(`No user found with customerId: ${customerId}`)
        }
    }

    if (event.type === 'customer.subscription.updated') {
        const subscription = event.data.object
        const customerId = subscription.customer

        const usersRef = adminDB.collection('users')
        const matchingUsers = await usersRef.where('stripeCustomerId', '==', customerId).get()

        if (!matchingUsers.empty) {
            const userDoc = matchingUsers.docs[0]

            const isCancelled = subscription.cancel_at_period_end === true
            const renewal = subscription.current_period_end
            ? subscription.current_period_end * 1000
            : null

            await userDoc.ref.update({
            subscriptionStatus: subscription.status,
            cancelAtPeriodEnd: isCancelled,
            subscriptionRenewal: renewal,
            })

            console.log(`Updated subscription status for ${userDoc.id}: ${subscription.status}`)
        } else {
            console.warn(`No user found with customerId: ${customerId}`)
        }
    }

    return NextResponse.json({ received: true })
}

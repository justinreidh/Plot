import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'
import { adminDB } from '../../../lib/firebase-admin' 
import Stripe from 'stripe'

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

    return NextResponse.json({ received: true })
}

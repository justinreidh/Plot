import { buffer } from 'micro'
import { stripe } from '@/lib/stripe'
import { adminDB } from '@/lib/firebase-admin'

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
    runtime: 'nodejs',
    regions: ['iad'],
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed')
    }

    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    let event
    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
    } catch (err) {
        console.log('🧪 Incoming request to:', req.url)
        console.error('❌ Webhook signature verification failed.')
        console.error('Signature:', sig)
        console.error('Expected secret:', endpointSecret)
        console.error('Error message:', err.message)
        console.log('🟢 Raw body received:', buf.toString())
        return res.status(400).send(`Webhook Error 1234: ${err.message}`)
    }

    const type = event.type
    const object = event.data.object

    try {
        if (type === 'checkout.session.completed') {
        const userId = object.metadata?.userId
        const customerId = object.customer
        const subscriptionId = object.subscription
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)

        await adminDB.collection('users').doc(userId).set({
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            subscriptionStatus: subscription.status,
            subscriptionRenewal: subscription.start_date * 1000,
        }, { merge: true })
        }

        if (type === 'customer.subscription.updated') {
        const customerId = object.customer
        const usersRef = adminDB.collection('users')
        const matchingUsers = await usersRef.where('stripeCustomerId', '==', customerId).get()

        if (!matchingUsers.empty) {
            const userDoc = matchingUsers.docs[0]
            const isCancelled = object.cancel_at_period_end === true
            const renewal = object.current_period_end ? object.current_period_end * 1000 : null

            await userDoc.ref.update({
            subscriptionStatus: object.status,
            cancelAtPeriodEnd: isCancelled,
            subscriptionRenewal: renewal,
            })
        }
        }

        if (type === 'customer.subscription.deleted') {
        const customerId = object.customer
        const usersRef = adminDB.collection('users')
        const matchingUsers = await usersRef.where('stripeCustomerId', '==', customerId).get()

        if (!matchingUsers.empty) {
            const userDoc = matchingUsers.docs[0]
            await userDoc.ref.update({
            subscriptionStatus: 'canceled',
            subscriptionRenewal: null,
            })
        }
        }

        return res.status(200).json({ received: true })
    } catch (err) {
        console.error('Webhook handler error:', err)
        return res.status(500).send('Server error')
    }
}

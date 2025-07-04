import { stripe } from '@/lib/stripe'
import { adminDB } from '@/lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { userId } = await req.json()

        const userDoc = await adminDB.collection('users').doc(userId).get()
        const customerId = userDoc.data()?.stripeCustomerId

        if (!customerId) {
        return NextResponse.json({ error: 'Stripe customer ID not found' }, { status: 404 })
        }

        const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.BASE_URL}`,
        })

        return NextResponse.json({ url: session.url })
    } catch (err) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

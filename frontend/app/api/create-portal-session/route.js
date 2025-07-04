import { stripe } from '@/lib/stripe'
import { adminDB } from '@/lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { userId } = await req.json()
        if (!userId) {
            console.error('Missing userId in request body');
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const userDoc = await adminDB.collection('users').doc(userId).get()
        if (!userDoc.exists) {
            console.error(`User not found for ID: ${userId}`);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
                
        const customerId = userDoc.data()?.stripeCustomerId

        if (!customerId) {
            console.error(`Stripe customer ID not found for user: ${userId}`);
            return NextResponse.json({ error: 'Stripe customer ID not found' }, { status: 404 })
        }

        const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.BASE_URL}`,
        })

        return NextResponse.json({ url: session.url })
    } catch (err) {
        console.error('Stripe portal error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const formData = await req.formData()
    const userId = formData.get('userId')

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1RbpQhRS2RI7JWFvn1FUlXMl',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {userId},
      success_url: `${origin}/success`,
      cancel_url: `${origin}/canceled`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
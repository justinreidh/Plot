'use client'

import { auth } from '../../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function IndexPage() {
  const handleCheckout = async () => {
    const user = auth.currentUser
    if (!user) return alert('Please log in first.')

    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid }),
    })

    if (res.redirected) {
      window.location.href = res.url
    } else {
      const { error } = await res.json()
      alert(error)
    }
  }

  return (
    <section>
      <button onClick={handleCheckout}>Checkout</button>
    </section>
  )
}

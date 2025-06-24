'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../lib/firebase'
import { NavBar } from '@/components/Navbar'
import Image from 'next/image'

export default function Auth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [subscription, setSubscription] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser || null)
        if (firebaseUser) {
            try {
                const docRef = doc(db, 'users', firebaseUser.uid)
                const userDoc = await getDoc(docRef)
                const subscriptionStatus = userDoc.exists() ? userDoc.data().subscriptionStatus : null
                setSubscription(subscriptionStatus)
                
            } catch (err) {
                console.error('Failed to check subscription:', err)
                router.push('/checkout')
            }
        }
        setLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
    };

    const logout = async () => {
        await signOut(auth);
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>

    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center h-[calc(100vh-60px)]">
                {user ? (
                    <div className='flex flex-col items-center justify-center border rounded pb-20 w-100 h-100'>
                        <h1 className='m-6 border-gray-300 border rounded p-2 text-4xl'>Welcome,<br/>{user.displayName}</h1>
                        <button onClick={logout} className="border border-black px-4 py-2 rounded shadow-lg hover:shadow-sm cursor-pointer">Sign Out</button>
                        {subscription !== 'active' && (<div className='p-6 text-center'>You don't have an active subscription. <Link href={'/subscription'} className='font-semibold text-blue-500'>Start one </Link>to unlock the full power of Plot.</div>)}

                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center border rounded pb-20 w-100 h-100'>
                        <h1 className='m-6 border-gray-300 border rounded p-2 text-4xl'>Log in to <span className='font-semibold'>Plot.</span></h1>
                        <button onClick={signInWithGoogle} className='cursor-pointer shadow-lg hover:shadow-sm'>
                            <Image src={'/sign.png'} width={200} height={100} alt='Google Icon'></Image>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

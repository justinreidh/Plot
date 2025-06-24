'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from "../../lib/firebase"
import { NavBar } from '@/components/Navbar';
import Image from 'next/image';

export default function Auth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user || null);
        })

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center h-[calc(100vh-60px)]">
                {user ? (
                    <div className='flex flex-col items-center justify-center border rounded pb-20 w-100 h-100'>
                        <h1 className='m-6 border-gray-300 border rounded p-2 text-4xl'>Welcome,<br/>{user.displayName}</h1>
                        <button onClick={logout} className="border border-black px-4 py-2 rounded shadow-lg hover:shadow-sm cursor-pointer">Sign Out</button>
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

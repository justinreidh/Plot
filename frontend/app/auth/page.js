'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from "../../lib/firebase"
import { NavBar } from '@/components/Navbar';

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
            <div className="p-6">
                {user ? (
                    <div>
                        <h1>Welcome, {user.displayName}</h1>
                        <button onClick={logout}>Sign Out</button>
                    </div>
                ) : (
                    <div>
                        <h1>Sign In</h1>
                        <button onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>
                )}
            </div>
        </div>
    );
}

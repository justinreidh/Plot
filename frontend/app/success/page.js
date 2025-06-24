'use client'

import { NavBar } from "@/components/Navbar"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function success() {
    const { user, subscription, loading } = useAuth();



    return (
        
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
                <div className='flex flex-col items-center justify-center border rounded text-center w-100 h-100'>
                    <h1 className='m-6 text-2xl'>
                        Thank you for your purchase{user?.displayName ? `, ${user.displayName}` : ''}.<br />
                        You will receive an email confirming your subscription.
                        <br /><br />
                        Now it's time to <Link className="font-semibold text-blue-500" href={'/docs'}><span className="font-semibold">start writing with Plot.</span> </Link>
                    </h1>
                </div>
            </div>
        </div>
    )
}
'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef } from "react";
import { NavBar } from "@/components/Navbar";
import { SubscriptionInfo } from "@/components/SubscriptionInfo";

export default function Checkout() {
    const formRef = useRef(null)
    const { user, subscription, loading, subscriptionRenewal } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.push("/auth");
        }
    }, [user, subscription, loading]);

    if (loading || !user) return <p>Loading...</p>;
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
        alert('Please log in first.')
        return
        }

        const input = formRef.current.querySelector('input[name="userId"]')
        input.value = user.uid

        formRef.current.submit()
    }

    return (
        
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
                {(subscription !== 'active') ? (
                    <form ref={formRef} action="/api/checkout_sessions" method="POST">
                        <input type="hidden" name="userId" />
                        <button type="submit" onClick={handleSubmit} className='flex flex-col items-center justify-center border rounded text-center w-100 h-100 cursor-pointer hover:bg-gray-100'>
                            <h1 className="text-2xl">Checkout</h1>
                        </button>
                    </form>
                ) : (
                    <SubscriptionInfo/>
                )}
                
                
            </div>
        </div>
    )
}
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
            <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)] text-xl">
                {(subscription !== 'active') ? (
                    <div className="flex flex-col items-center justify-center border rounded text-center w-100 h-100 p-6">
                        <h1 className="mb-4">One simple plan, made for a writer's budget:</h1>
                        <h1 className="text-4xl mb-4">$2.5/month, billed anually.</h1>
                        <h1 className="text-sm">Includes ALL features: Unlimited Projects, Story Forms, and Beat Boards</h1>
                        <h1 className="text-sm text-gray-600">+ continual feature updates!</h1>
                        <h1 className="mb-4 text-sm text-gray-600">Cancel Anytime</h1>
                        <form ref={formRef} action="/api/checkout_sessions" method="POST">
                            <input type="hidden" name="userId" />
                            <button type="submit" onClick={handleSubmit} className='p-2 border-gray-200 border rounded cursor-pointer hover:bg-gray-100'>
                                <h1 className="text-2xl">Get Started</h1>
                            </button>
                        </form>
                    </div>
                ) : (
                    <SubscriptionInfo/>
                )}
                
                
            </div>
        </div>
    )
}
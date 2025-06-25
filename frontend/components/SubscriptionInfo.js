'use client'

import { useAuth } from "../context/AuthContext";

export function SubscriptionInfo() {
    const { user, subscription, loading, subscriptionRenewal, renew } = useAuth();
    if (loading || !user) return <p>Loading...</p>;

    const handleManage = async () => {
        const res = await fetch('/api/create-portal-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.uid }),
        })

        const data = await res.json()
        if (data.url) {
            window.location.href = data.url
        } else {
            alert(data.error || 'Failed to open customer portal')
        }
    }

    return(
        <div>
            <h1>Subscription status: {subscription}</h1>
            <h1>Subscription started on: {new Date(subscriptionRenewal).toLocaleDateString()}</h1>
            {renew == true ? (<h1>Your subscription <strong>will</strong> renew at the end of this billing period.</h1>)
                :
                (<h1>Your subscription <strong>will not </strong>renew at the end of this billing period.</h1>)
            }
            <br/>
            <h1 className="text-gray-500">Need to manage your subscription? <button onClick={handleManage} className="text-blue-500 cursor-pointer">Click here.</button></h1>
        </div>
    )
    
}
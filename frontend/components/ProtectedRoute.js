'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export function ProtectedRoute({ children }) {
    const { user, subscription, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth");
        }
        if (subscription !== 'active') {
            router.push('checkout')
        }
        console.log("subscription is:", subscription)
    }, [user, subscription, loading]);

    if (loading || !user || subscription !== 'active') return <p>Loading...</p>;
    return children;
}

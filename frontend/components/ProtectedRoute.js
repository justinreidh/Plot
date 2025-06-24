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
        if (!loading && subscription !== 'active') {
            router.push('/subscription')
        }
    }, [user, subscription, loading]);

    if (loading || !user || subscription !== 'active') return <p>Loading...</p>;
    return children;
}

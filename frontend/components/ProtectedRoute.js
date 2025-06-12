'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.push("/auth");
        }
    }, [user, loading]);

    if (loading || !user) return <p>Loading...</p>;
    return children;
}

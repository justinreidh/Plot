'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef } from "react";

export default function Checkout() {
    const formRef = useRef(null)
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.push("/auth");
        }
    }, [user, loading]);

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
        <form ref={formRef} action="/api/checkout_sessions" method="POST">
        <input type="hidden" name="userId" />
        <button type="submit" onClick={handleSubmit}>
            Checkout
        </button>
        </form>
    )
}
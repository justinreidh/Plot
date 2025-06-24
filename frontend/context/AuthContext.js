'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../lib/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [subscription, setSubscription] = useState(null)
    const [loading, setLoading] = useState(true); 
    const [subscriptionRenewal, setSubscriptionRenewal] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser || null);

        if (firebaseUser) {
            try {
            const subDoc = await getDoc(doc(db, "users", firebaseUser.uid))
            if (subDoc.exists()) {
                setSubscription(subDoc.data().subscriptionStatus || null)
                setSubscriptionRenewal(subDoc.data().subscriptionRenewal || null)
            } else {
                setSubscription(null)
            }
            } catch (error) {
            console.error("Failed to fetch subscription:", error)
            setSubscription(null)
            }
        } else {
            setSubscription(null)
        }

        setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, subscription, loading, subscriptionRenewal }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

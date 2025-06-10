'use client'

import Link from 'next/link'
import { useAuth } from '../../context/AuthContext';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Sidebar } from '../../components/Sidebar'

export default function Docs() {
    const {user,loading} = useAuth();

    if (loading) return <p>Loading...</p>;

    return (
        <ProtectedRoute>
            <div className='flex flex-row'>
                <Sidebar />
                <div className="p-4">
                <div>Welcome to your documents page, {user?.displayName || 'Guest User'}</div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

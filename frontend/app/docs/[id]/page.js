'use client'

import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Sidebar } from '../../../components/Sidebar'
import { useParams } from 'next/navigation';

export default function Document() {
    const {user,loading} = useAuth();
    const params = useParams();
    const docID = params.id;

    if (loading) return <p>Loading...</p>;

    return (
        <ProtectedRoute>
            <div className='flex flex-row'>
                <Sidebar />
                <div className="p-4">
                    <div>Welcome, {user?.displayName || 'Guest User'}. This is the page for: {docID}</div>
                    
                </div>
            </div>
        </ProtectedRoute>
    );
}
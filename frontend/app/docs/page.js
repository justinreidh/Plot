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
                    <DocCards />
                </div>
            </div>
        </ProtectedRoute>
    );
}

function DocCards() {
    const documents = [
        {
        id: 'proj1',
        title: 'Project Alpha',
        lastEdited: '2025-06-01',
        },
        {
        id: 'proj2',
        title: 'Beta Notes',
        lastEdited: '2025-06-05',
        },
        {
        id: 'proj3',
        title: 'Gamma Research',
        lastEdited: '2025-06-08',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {documents.map((doc) => (
            <Link href={`/docs/${doc.id}`} key={doc.id}>
            <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <p className="text-sm text-gray-500">Last edited: {doc.lastEdited}</p>
                <p className="text-blue-500 text-sm mt-2 underline">Open Project</p>
            </div>
            </Link>
        ))}
        </div>
    );
}
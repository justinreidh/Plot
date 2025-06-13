'use client'

import Link from 'next/link'
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { initialFormData, emptyDefaultScenes } from '@/lib/defaultFields';
import { NewProjectButton } from '@/components/NewProjectButton';

export default function Docs() {
    const {user,loading} = useAuth();
    
    if (loading) return <p>Loading...</p>;

    return (
            <div className='flex flex-row'>
                <div className="p-4">
                    <div>Welcome to your documents page, {user?.displayName || 'Guest User'}.</div>
                    <NewProjectButton user={user} />
                    <DocCards />
                </div>
            </div>
        
    );
}

function DocCards() {
    const { user } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!user) return;
            try {
                const q = query(
                    collection(db, 'projects'),
                    where('userID', '==', user.uid)
                );
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDocuments(docs);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [user]);

    if (loading) return <p>Loading your projects...</p>;

    if (!documents.length) return <p>You don’t have any projects yet.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {documents.map((doc) => (
            <Link href={`/docs/${doc.id}`} key={doc.id}>
            <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <p className="text-sm text-gray-500">Last edited: {doc.updatedAt}</p>
                <p className="text-blue-500 text-sm mt-2 underline">Open Project</p>
            </div>
            </Link>
        ))}
        </div>
    );
}
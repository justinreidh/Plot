'use client'

import Link from 'next/link'
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { NewProjectButton } from '@/components/NewProjectButton';
import { NavBar } from '@/components/Navbar';

export default function Docs() {
    const {user,loading} = useAuth();
    
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <NavBar />
            <div>
                <div className="p-4">
                    <div>Let's get writing, {user?.displayName || 'Guest User'}.</div>
                    <NewProjectButton user={user} />
                    <DocCards />
                </div>
            </div>
        </div>
    );
}

function DocCards() {
    const { user, subscription } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!user || subscription !== 'active') return;
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

    if (!documents.length) return <p className='mt-6'>You don't have any projects yet.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {documents.map((doc) => (
            <Link href={`/docs/${doc.id}`} key={doc.id}>
                <div className="p-4 bg-white border focus:bg-gray-100 cursor-pointer rounded">
                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                    <p className="text-sm text-gray-500">Last edited: {new Date(doc.updatedAt).toLocaleDateString()}</p>
                    <p className="text-blue-500 text-sm mt-2 underline">Open Project</p>
                </div>
            </Link>
        ))}
        </div>
    );
}
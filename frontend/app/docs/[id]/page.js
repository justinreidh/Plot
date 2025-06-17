'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from "@/lib/firebase"
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { StoryForm } from '@/components/StoryForm/StoryForm'
import { SceneGrid } from '@/components/SceneGrid/SceneGrid'
import { CharacterForm } from '@/components/StoryForm/CharacterForm';
import { VisualForm } from '@/components/StoryForm/VisualForm'
import { SymbolForm } from '@/components/StoryForm/SymbolForm';
import { ThemeForm } from '@/components/StoryForm/ThemeForm';
import { PlotForm } from '@/components/StoryForm/PlotForm';
import { initialFormData, emptyDefaultScenes } from '@/lib/defaultFields'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Document() {
    const {user,loading} = useAuth();
    const params = useParams();
    const searchParams = useSearchParams();

    const docID = params.id;
    const page = searchParams.get('page') || 'story';

    const [formData, setFormData] = useState(initialFormData);
    const [scenes, setScenes] = useState(emptyDefaultScenes)
    const [title, setTitle] = useState('Untitled Project')
    const [saving, setSaving] = useState(false);
    const [showNav, setShowNav] = useState(true);


    useEffect(() => {
    const load = async () => {
        const ref = doc(db, "projects", docID);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            setFormData(snap.data().formData || initialFormData);
            setScenes(snap.data().scenes || emptyDefaultScenes)
            setTitle(snap.data().title || "Untitled Project")
        }
        };
        if (user && docID) load();
    }, [user, docID]);

    const saveData = async () => {
        if (!user || !docID) return;
        setSaving(true);
        try {
            await setDoc(doc(db, "projects", docID), {
                userID: user.uid,
                updatedAt: new Date().toISOString(),
                formData,
                scenes,
                title,
            }, { merge: true });
            console.log("Saved!");
        } catch (err) {
            console.error("Error saving:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className='p-4'>Loading...</p>;

    return (
        <div className='w-full relative'>
            <button
                onClick={() => setShowNav(prev => !prev)}
                className="fixed left-0 top-0 bg-white border px-1 hover:bg-gray-100 z-200"
            >
                {showNav ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showNav && (
                <div className='flex flex-row justify-between items-center h-14 pl-6 pr-4 border-b-1 bg-white border-gray-200 sticky top-0 z-100 min-w-237'>  
                    <div className='flex flex-row'>
                        <input className='py-1 focus:outline-1 rounded p-2 font-semibold text-xl' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    
                        <nav className="flex space-x-2 ml-4">
                            <TabButton select="story" label="Story" docID={docID} page={page} />
                            <TabButton select="characters" label="Characters" docID={docID} page={page} />
                            <TabButton select="theme" label="Theme" docID={docID} page={page}/>
                            <TabButton select="visuals" label="Visuals" docID={docID} page={page} />
                            <TabButton select="symbols" label="Symbols" docID={docID} page={page} />
                            <TabButton select="plot" label="Plot" docID={docID} page={page} />
                            <TabButton select="board" label="Beat Board" docID={docID} page={page} />
                        </nav>
                    </div>
                    <div>
                    <button onClick={saveData} className="px-4 py-2 mr-2 cursor-pointer border hover:bg-gray-100 rounded">
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <Link href={'/docs'} className="px-4 py-2 cursor-pointer border hover:bg-gray-100 rounded">Docs</Link>
                    </div>
                </div>
            )}
            
            

            <main className='p-4'>
                {page === 'story' && <div><StoryForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'characters' && <div><CharacterForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'theme' && <div><ThemeForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'visuals' && <div><VisualForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'symbols' && <div><SymbolForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'plot' && <div><PlotForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'board' && <div><SceneGrid scenes={scenes} setScenes={setScenes} /></div>}
            </main>
            <div className='h-50'></div>
        </div>
    );
}

function TabButton({select, label, docID, page}) {
    const router = useRouter();
    const goToPage = (select) => {
        router.push(`/docs/${docID}?page=${select}`);
    };
    return (
        <button onClick={() => goToPage(select)} className={`p-2 rounded hover:bg-gray-100 cursor-pointer ${page === select ? 'font-semibold border' : ''}`}>
            {label}
        </button>
    );
}

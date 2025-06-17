'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from "@/lib/firebase"
import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { StoryForm } from '@/components/StoryForm/StoryForm'
import { SceneGrid } from '@/components/SceneGrid/SceneGrid'
import { Demo } from '@/components/Demo/Demo'
import { CharacterForm } from '@/components/StoryForm/CharacterForm';
import { VisualForm } from '@/components/StoryForm/VisualForm'
import { SymbolForm } from '@/components/StoryForm/SymbolForm';
import { ThemeForm } from '@/components/StoryForm/ThemeForm';
import { PlotForm } from '@/components/StoryForm/PlotForm';
import { initialFormData, emptyDefaultScenes } from '@/lib/defaultFields'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Document() {
    const searchParams = useSearchParams();

    const page = searchParams.get('page') || 'story';

    const [formData, setFormData] = useState(initialFormData);
    const [scenes, setScenes] = useState(emptyDefaultScenes)
    const [title, setTitle] = useState('Untitled Project')
    const [showNav, setShowNav] = useState(true);


    useEffect(() => {
    const load = async () => {
        const ref = doc(db, "projects", "proj1");
        const snap = await getDoc(ref);
        if (snap.exists()) {
            setFormData(snap.data().formData || initialFormData);
            setScenes(snap.data().scenes || emptyDefaultScenes)
            setTitle(snap.data().title || "Untitled Project")
        }
        };
        load();
    }, []);



    return (
        <div className='w-full'>
            {showNav && (
                <div className='flex flex-row justify-between items-center h-14 px-4 border-b-1 bg-white border-gray-200 sticky top-0 z-100 min-w-236'>  
                    <div className='flex flex-row'>
                        <div className='py-1 focus:outline-none font-semibold text-xl text-gray-400'>Sample - Inception</div>
                    
                        <nav className="flex space-x-2 ml-4">
                            <TabButton select="story" label="Story" docID={"proj1"} page={page} />
                            <DemoTabButton select="characters" label="Characters" docID={"proj1"} page={page} />
                            <DemoTabButton select="theme" label="Theme" docID={"proj1"} page={page}/>
                            <DemoTabButton select="visuals" label="Visuals" docID={"proj1"} page={page} />
                            <DemoTabButton select="symbols" label="Symbols" docID={"proj1"} page={page} />
                            <DemoTabButton select="plot" label="Plot" docID={"proj1"} page={page} />
                            <TabButton select="board" label="Beat Board" docID={"proj1"} page={page} />
                        </nav>
                    </div>
                    <Link href={'/auth'} className="px-4 mr-10 py-2 ml-2 cursor-pointer border hover:bg-gray-100 rounded">
                        Get Started
                    </Link>
                </div>
            )}
            
            <button
                onClick={() => setShowNav(prev => !prev)}
                className="absolute right-4 top-0 bg-white border px-1 hover:bg-gray-100 z-200"
            >
                {showNav ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <main className='p-4'>
                {page === 'story' && <div><StoryForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'characters' && <div><GetStarted /></div>}
                {page === 'theme' && <div><GetStarted /></div>}
                {page === 'visuals' && <div><GetStarted /></div>}
                {page === 'symbols' && <div><GetStarted /></div>}
                {page === 'plot' && <div><GetStarted /></div>}
                {page === 'board' && <div><Demo scenes={scenes} setScenes={setScenes} />
                    <GetStarted />
                </div>}
            </main>
            <div className='h-50'></div>
        </div>
    );
}

function TabButton({select, label, docID, page}) {
    const router = useRouter();
    const goToPage = (select) => {
        router.push(`/demo?page=${select}`);
    };
    return (
        <button onClick={() => goToPage(select)} className={`p-2 rounded hover:bg-gray-100 cursor-pointer ${page === select ? 'font-semibold border' : ''}`}>
            {label}
        </button>
    );
}

function DemoTabButton({select, label, docID, page}) {
    const router = useRouter();
    const goToPage = (select) => {
        router.push(`/demo?page=${select}`);
    };
    return (
        <button onClick={() => goToPage(select)} className={`p-2 text-gray-400 rounded hover:bg-gray-100 cursor-pointer ${page === select ? 'font-semibold border' : ''}`}>
            {label}
        </button>
    );
}


function GetStarted() {
    return (
        <div className='p-10 flex flex-col justify-center items-center'>
            <div className='max-w-2xl text-2xl p-4 border rounded text-center '>
                Sign up to save your projects, get full access to the guided forms, and unlock the full power of <span className='font-semibold'>Plot.</span>
            </div>
            <Link
                href={'/auth'}
                className="flex justify-center items-center py-3 m-6 h-20 w-40 border-gray-300 border rounded-xl hover:bg-gray-100 cursor-pointer mb-6 md:mb-0"
            >
                Get Started
            </Link>
        </div>
    )
}
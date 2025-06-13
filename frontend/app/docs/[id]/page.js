'use client'

import Link from 'next/link'
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

export default function Document() {
    const {user,loading} = useAuth();
    const params = useParams();
    const searchParams = useSearchParams();

    const docID = params.id;
    const page = searchParams.get('page') || 'story';

    const [formData, setFormData] = useState({});

    if (loading) return <p className='p-4'>Loading...</p>;

    return (
        <div className='w-full'>
            <div className='flex flex-row items-center h-14 px-4 border-b-1 bg-white border-gray-200 sticky top-0 z-100'>
                <div>Project ID: {docID}</div>

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
            

            <main className='p-4'>
                {page === 'story' && <div><h2 className='text-xl font-semibold mb-4'>Story Content</h2><StoryForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'characters' && <div><h2 className='text-xl font-semibold mb-4'>Characters</h2><CharacterForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'theme' && <div><h2 className='text-xl font-semibold mb-4'>Theme</h2><ThemeForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'visuals' && <div><h2 className='text-xl font-semibold mb-4'>Visuals</h2><VisualForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'symbols' && <div><h2 className='text-xl font-semibold mb-4'>Symbols</h2><SymbolForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'plot' && <div><h2 className='text-xl font-semibold mb-4'>Plot</h2><PlotForm formData={formData} setFormData={setFormData} /></div>}
                {page === 'board' && <div><h2 className='text-xl font-semibold mb-4'>Beat Board</h2><SceneGrid /></div>}


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
        <button onClick={() => goToPage(select)} className={`p-2 rounded hover:bg-gray-100 cursor-pointer ${page === select ? 'bg-gray-100' : ''}`}>
            {label}
        </button>
    );
}

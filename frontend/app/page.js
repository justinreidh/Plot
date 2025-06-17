'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

    return (
          <main className="min-h-screen flex items-center justify-center bg-white text-gray-900">
                <div className="text-center max-w-5xl p-6">
                    <div className='flex flex-col md:flex-row'>
                        <h1 className="text-8xl h-36.5 rounded border mr-6 font-extrabold mb-4 p-6">Plot.</h1>
                        <p className="text-xl rounded border p-6 border-gray-300 mb-7 min-h-36.5">
                            <span className='font-extrabold'>Plot.</span> is a simple but powerful tool for novelists and screenwriters. Using a guided story framework,
                            it helps you craft compelling characters and thought-provoking narratives—every step of the way.
                        </p>
                    </div>
                    <div className='flex justify-between flex-col md:flex-row'>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link
                                href={'/auth'}
                                className="flex justify-center items-center py-3 h-20 w-40 border rounded-xl hover:bg-gray-100 cursor-pointer mb-6 md:mb-0"
                            >
                                Get Started
                            </Link>
                            <Link
                                href={'/demo'}
                                className="flex justify-center items-center py-3 h-20 w-40 border border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer sm:mb-6 md:mb-0"
                            >
                                Try Demo
                            </Link>
                        </div>
                        <div className="px-6 py-3 border border-gray-200 rounded-xl w-full ml-4">
                            <p className='text-sm'>
                                <span className='font-extrabold'>In-depth plot guides </span>
                               and step-by-step frameworks help you build your story from concept to completion.
                                The <span className='font-extrabold'>Beat Board </span> lets you create, label, and drag-and-drop scenes with ease, giving you complete control over your story’s structure.
                            </p>
                        </div>
                    </div>

                    
                    <div className='flex border my-4 p-4 rounded shadow-2xl shadow-gray-200'>
                        <Link href={'/demo'} className="relative flex-1 m-2 aspect-square border rounded group cursor-pointer">
                                <Image 
                                    src="/2.svg"
                                    alt="Screenshot of the story overview form"
                                    fill
                                    className="object-contain p-4 rounded "
                                />
                                <div className="absolute inset-0 rounded bg-black bg-opacity-40 opacity-0 group-hover:opacity-80 flex items-center justify-center transition duration-300 flex-col">
                                    <div className="text-white text-4xl font-semibold mb-6">Story Forms.</div>
                                    <div className="text-white text-xl font-semibold border rounded p-2">Try Demo</div>
                                </div>
                        </Link>
                        <Link href={'/demo?page=board'} className="relative flex-1 m-2 aspect-square border rounded group cursor-pointer">
                            <Image 
                                src="/1.svg"
                                alt="Screenshot of the beat board"
                                fill
                                className="object-contain p-4 rounded"
                            />
                            <div className="absolute inset-0 rounded bg-black bg-opacity-40 opacity-0 group-hover:opacity-80 flex items-center justify-center transition duration-300 flex-col">
                                <div className="text-white text-4xl font-semibold mb-6">Beat Board.</div>
                                <div className="text-white text-xl font-semibold border rounded p-2">Try Demo</div>
                            </div>
                        </Link>
                    </div>
                </div>
          </main>
    )
}


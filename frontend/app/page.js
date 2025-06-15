'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    return (
          <main className="min-h-screen flex items-center justify-center bg-white text-gray-900">
                <div className="text-center max-w-5xl p-6">
                    <div className='flex flex-col sm:flex-row lg:flex-row'>
                        <h1 className="text-8xl h-36.5 rounded border mr-6 font-extrabold mb-4 p-6">Plot.</h1>
                        <p className="text-xl rounded border p-6 border-gray-300 mb-7">
                            <span className='font-extrabold'>Plot.</span> is an advanced tool for novelists and screenwriters. Using a guided story framework,
                            it helps you shape powerful characters and compelling narratives—every step of the way.
                        </p>
                    </div>
                    <div className="flex justify-start gap-4">
                    <button
                        onClick={() => router.push('/auth')}
                        className="px-6 py-3 border rounded-xl hover:bg-gray-100 cursor-pointer"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => router.push('/demo')}
                        className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                    >
                        Try Demo
                    </button>
                    </div>
                </div>
          </main>
    )
}


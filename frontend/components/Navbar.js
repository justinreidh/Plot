'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export function NavBar() {
    const {user} = useAuth();

    return (
        <nav className='h-14 px-4 py-2 flex items-center justify-between border-b-1 border-gray-300'>
            <div className="p-2 text-lg font-semibold hover:bg-gray-100 rounded">
                <Link href={user ? '/docs' : '/'} className="">
                    Plot.
                </Link>
            
            </div>

            <div className="flex gap-4 items-center">
                <Link href='/auth' className="p-2 text-lg hover:bg-gray-100 rounded">
                    {user ? 'Logout' : 'Sign In' }
                </Link>
            </div>
        </nav>
    )
}
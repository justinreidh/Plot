'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export function NavBar() {
    const {user, subscription} = useAuth();

    return (
        <nav className='h-14 px-4 py-2 flex items-center justify-between border-b-1 border-gray-300'>
            <div className="p-2 text-lg font-semibold hover:bg-gray-100 rounded cursor-pointer">
                <Link href={(user && subscription == 'active') ? ('/docs') : ('/')} className="">
                    Plot.
                </Link>
            
            </div>

            <div className="flex gap-4 items-center">
                {(user && subscription == 'active') && 
                    (<Link href='/docs' className="p-2 text-lg hover:bg-gray-100 rounded">Go to Docs</Link>) 
                }
                {user && (<Link href='/auth' className="p-2 text-lg hover:bg-gray-100 rounded">Profile</Link>)}
            </div>
        </nav>
    )
}
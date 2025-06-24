import { NavBar } from "@/components/Navbar"
import Link from "next/link"

export default function success() {
    return (
        
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className='flex flex-col items-center justify-center border rounded text-center w-100 h-100'>
                    <h1 className='m-6 text-4xl'>
                        Thank you for your purchase. You will recieve an email confirming your subscription.<br/><br/>
                        Now it's time to <Link className="font-semibold text-blue-500" href={'/docs'}><span className="font-semibold">start writing with Plot.</span> </Link>
                    </h1>
                </div>
            </div>
        </div>
    )
}
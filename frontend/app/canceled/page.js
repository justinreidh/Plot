import { NavBar } from "@/components/Navbar"
import Link from "next/link"

export default function cancel() {
    return (
        
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
                <div className='flex flex-col items-center justify-center border rounded text-center w-100 h-100'>
                    <h1 className='m-6 text-2xl'>
                        You have canceled your purchase of a subscription to
                        <span className="font-semibold"> Plot. </span> 
                        If this was a mistake, you can <Link className="font-semibold text-blue-500" href={'/subscription'}>return to checkout.</Link> Otherwise, you are welcome to <Link className="font-semibold text-blue-500" href={'/demo'}>continue using our demo!</Link>
                    </h1>
                </div>
            </div>
        </div>
    )
}
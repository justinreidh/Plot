import { NavBar } from '@/components/Navbar'

export default function Support() {
    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                    <div className='flex flex-col items-center justify-center border rounded p-6 w-100 min-h-100'>
                        <h1 className='m-6 border-gray-300 border rounded p-2 text-4xl'>Support</h1>
                        <div className=''>
                            For technical support, or to submit a question or concern, email: <span className='text-blue-500'>plot.tool.help@gmail.com</span> 
                        </div>
                    </div>
                
            </div>
        </div>
    );
}

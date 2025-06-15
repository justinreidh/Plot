'use client'

import { useState } from "react";
import { Home, Settings, Menu } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded((prev) => !prev);
    };

    return (
            <div className={`sticky top-0 p-2 flex flex-col align-center h-screen border-r duration-300 ease-in-out ${expanded ? "w-64 min-w-64 bg-gray-50" : "w-13 min-w-13"} overflow-hidden`}>
                <button onClick={toggleSidebar} className="p-2 w-9 cursor-pointer rounded hover:bg-gray-100 mb-4 self-start">
                    <Menu size={20} />
                </button>

                <nav className="flex flex-col gap-y-2">   
                    <SidebarItem url='/docs' icon={<Home size={20}/>} label="Docs" expanded={expanded} />
                </nav>
            </div>
    );
}

function SidebarItem({ url, icon, label, expanded }) {
    return (
        <Link href={url} className={`flex items-center rounded p-2 hover:bg-gray-100 cursor-pointer ${expanded ? "w-60" : "w-9"}`}>
            <div className="mr-3">{icon}</div>
            <span className={`transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0"}`}>
                {label}
            </span>
        </Link>
    );
}

import { useState } from "react";

export function Sidebar() {
    const [expanded, setExpanded] = useState(true);

    const toggleSidebar = () => {
        setExpanded((prev) => !prev);
    };

    return (
        
        <div
            className={`h-screen border-r-1 transition-all duration-300 ease-in-out 
                        ${expanded ? "w-64 bg-gray-50" : "w-10"} overflow-hidden`}
        >
            <div className="flex items-center justify-between px-4 py-4">
                <button onClick={toggleSidebar}>
                    //
                </button>
            </div>

            <nav >
                <SidebarItem label="Home" expanded={expanded} />
                <SidebarItem label="Settings" expanded={expanded} />
            </nav>
        </div>
    );
    }

    function SidebarItem({ label, expanded }) {
    return (
        <div className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors cursor-pointer">
        <span className={`transition-opacity duration-200 ${expanded ? "opacity-100" : "hidden"}`}>
            {label}
        </span>
        </div>
    );
}

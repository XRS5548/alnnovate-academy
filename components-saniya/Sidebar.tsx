"use client";
import { X } from "lucide-react";

interface SidebarProps {
    active: string;
    setActive: (value: string) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function Sidebar({
    active,
    setActive,
    isOpen,
    setIsOpen,
}: SidebarProps) {
    const menuItems = [
        { key: "dashboard", label: "📊 Dashboard" },
        { key: "courses", label: "📚 Courses" },
        { key: "students", label: "🧑‍🎓 Students" },
        { key: "internships", label: "💼 Internships" },
        { key: "payments", label: "💰 Payments" },
        { key: "settings", label: "⚙️ Settings" },
    ];

    return (
        <>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
            >

                <div className="flex justify-between items-center mb-8 md:hidden">
                    <h2 className="text-lg font-bold">Alnnovate Admin</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-8 hidden md:block">
                    Alnnovate Admin
                </h2>

                {menuItems.map((item) => (
                    <button
                        key={item.key}
                        className={`block w-full text-left mb-3 px-3 py-2 rounded transition-colors
              ${active === item.key
                                ? "bg-blue-600"
                                : "hover:bg-gray-700 hover:text-blue-300"
                            }`}
                        onClick={() => {
                            setActive(item.key);
                            setIsOpen(false); // mobile me select karte hi close ho jaye
                        }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </>
    );
}

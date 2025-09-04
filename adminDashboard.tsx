"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminCourse from "./AdminCourse";
import AdminHome from "./AdminHome";
import AdminStudents from "./AdminStudents";
import AdminInternship from "./AdminInternship";
import Payment from "./Payment";
import { Menu } from "lucide-react";

export default function AdminDashboard() {
    const [active, setActive] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

            <Sidebar active={active} setActive={setActive} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col">

                <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-4 md:ml-64">
                    <div className="flex items-center gap-4">

                        <button
                            className="md:hidden text-gray-800 dark:text-gray-100"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu size={26} />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
                            {active}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600 dark:text-gray-300">Admin</span>
                    </div>
                </header>

                <section className="p-6 flex-1 overflow-y-auto md:ml-64">
                    {active === "dashboard" && <AdminHome />}
                    {active === "courses" && <AdminCourse />}
                    {active === "students" && <AdminStudents />}
                    {active === "internships" && <AdminInternship />}
                    {active === "payments" && <Payment />}
                </section>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Home,
  LifeBuoy,
  ListChecks,
  LogOut,
  PlusCircle,
  Settings,
  Trophy,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddCourseComponent from "@/components/admin/createcourseUI";
import DashboardCourses from "@/components/admin/dashboardcourses";
import AddExam from "@/components/admin/addexam";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Function to render content based on active tab
  const renderContent = () => {
    if(activeTab == 'Add Course'){
      return (
        <AddCourseComponent />
      )
    }
    else if(activeTab == 'courses'){
      return (
        <DashboardCourses />
      )
    }
     else if(activeTab == 'Add Exam'){
      return (
        <AddExam />
      )
    }
  };

  return (
    <div className="min-h-screen bg-background grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col gap-2 bg-card p-4 border-r">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-10 w-10 text-primary" />
          <div>
            <p className="font-semibold leading-tight font-headline">Alnnovate Academy</p>
            <p className="text-sm text-muted-foreground">Student Portal</p>
          </div>
        </div>
        <Separator className="my-2" />
        <nav className="flex flex-col gap-1">
          <SidebarItem icon={<Home className="h-4 w-4" />} label="Dashboard" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}/>
          <SidebarItem icon={<PlusCircle className="h-4 w-4" />} label="Add Course" active={activeTab === 'Add Course'} onClick={() => setActiveTab('Add Course')}/>
          <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
          <SidebarItem icon={<PlusCircle className="h-4 w-4" />} label="Add Exam" active={activeTab === 'Add Exam'} onClick={() => setActiveTab('Add Exam')} />
          <SidebarItem icon={<ListChecks className="h-4 w-4" />} label="Exams" active={activeTab === 'Exams'} onClick={() => setActiveTab('Exams')} />
          <SidebarItem icon={<ListChecks className="h-4 w-4" />} label="assignments" active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')} />
          <SidebarItem icon={<Calendar className="h-4 w-4" />} label="Schedule" active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
          <SidebarItem icon={<Trophy className="h-4 w-4" />} label="Certificates" active={activeTab === 'certs'} onClick={() => setActiveTab('certs')} />
          <SidebarItem icon={<Wallet className="h-4 w-4" />} label="Payments" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
          <SidebarItem icon={<LifeBuoy className="h-4 w-4" />} label="Support" active={activeTab === 'support'} onClick={() => setActiveTab('support')} />
          <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        <div className="mt-auto">
          <Button variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-col p-6">
        <div className="bg-card border rounded-lg p-6 h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className="w-full justify-start gap-3 px-3"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}
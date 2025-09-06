"use client";

import React from "react";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  LifeBuoy,
  ListChecks,
  LogOut,
  PlusCircle,
  Projector,
  Settings,
  Trophy,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

import AddCourseComponent from "@/components/admin/createcourseUI";
import DashboardCourses from "@/components/admin/dashboardcourses";
import AddExam from "@/components/admin/addexam";
import MyExams from "@/components/admin/myexam";

export default function StudentDashboard() {
  const params = useParams();
  const router = useRouter();

  // slug le lo url se
  const slug = params?.slug as string || "overview";

  // function for render content
  const renderContent = () => {
    switch (slug) {
      case "add-course":
        return <AddCourseComponent />;
      case "courses":
        return <DashboardCourses />;
      case "add-exam":
        return <AddExam />;
      case "exams":
        return <MyExams />;
      default:
        return <div>Welcome to your dashboard 👋</div>;
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
          <SidebarItem icon={<Home className="h-4 w-4" />} label="Dashboard" active={slug === "overview"} onClick={() => router.push("/dashboard/overview")} />
          <SidebarItem icon={<PlusCircle className="h-4 w-4" />} label="Add Course" active={slug === "add-course"} onClick={() => router.push("/dashboard/add-course")} />
          <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Courses" active={slug === "courses"} onClick={() => router.push("/dashboard/courses")} />
          <SidebarItem icon={<PlusCircle className="h-4 w-4" />} label="Add Exam" active={slug === "add-exam"} onClick={() => router.push("/dashboard/add-exam")} />
          <SidebarItem icon={<ListChecks className="h-4 w-4" />} label="Exams" active={slug === "exams"} onClick={() => router.push("/dashboard/exams")} />
          <SidebarItem icon={<PlusCircle className="h-4 w-4" />} label="Add Projects" active={slug === "addprojects"} onClick={() => router.push("/dashboard/addprojects")} />
          <SidebarItem icon={<Projector className="h-4 w-4" />} label="Projects" active={slug === "projects"} onClick={() => router.push("/dashboard/projects")} />

          
          <SidebarItem icon={<ListChecks className="h-4 w-4" />} label="Assignments" active={slug === "assignments"} onClick={() => router.push("/dashboard/assignments")} />
          <SidebarItem icon={<Calendar className="h-4 w-4" />} label="Schedule" active={slug === "schedule"} onClick={() => router.push("/dashboard/schedule")} />
          <SidebarItem icon={<Trophy className="h-4 w-4" />} label="Certificates" active={slug === "certs"} onClick={() => router.push("/dashboard/certs")} />
          <SidebarItem icon={<Wallet className="h-4 w-4" />} label="Payments" active={slug === "payments"} onClick={() => router.push("/dashboard/payments")} />
          <SidebarItem icon={<LifeBuoy className="h-4 w-4" />} label="Support" active={slug === "support"} onClick={() => router.push("/dashboard/support")} />
          <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" active={slug === "settings"} onClick={() => router.push("/dashboard/settings")} />
        </nav>

        <div className="mt-auto">
          <Button variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col p-6">
        <div className="bg-card border rounded-lg p-6 h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
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

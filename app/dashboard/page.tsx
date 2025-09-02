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
  Settings,
  Trophy,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Function to render content based on active tab
  const renderContent = () => {
    if (activeTab === "overview") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Enrolled Courses</h3>
              <p className="text-2xl font-bold mt-2">5</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Pending Assignments</h3>
              <p className="text-2xl font-bold mt-2">3</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Upcoming Classes</h3>
              <p className="text-2xl font-bold mt-2">2</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Completed assignment: Math Quiz</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 4:30 PM</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Enrolled in new course: Physics 101</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "courses") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Mathematics 101</h3>
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Ongoing</span>
              </div>
              <p className="text-muted-foreground mt-2">Introduction to advanced mathematics concepts</p>
              <div className="mt-4 bg-secondary h-2 rounded-full">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">65% complete</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Physics Fundamentals</h3>
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Ongoing</span>
              </div>
              <p className="text-muted-foreground mt-2">Learn the basics of physics</p>
              <div className="mt-4 bg-secondary h-2 rounded-full">
                <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">30% complete</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Literature Appreciation</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Completed</span>
              </div>
              <p className="text-muted-foreground mt-2">Explore classic and modern literature</p>
              <div className="mt-4 bg-secondary h-2 rounded-full">
                <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">100% complete</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Computer Science Basics</h3>
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Ongoing</span>
              </div>
              <p className="text-muted-foreground mt-2">Introduction to programming and algorithms</p>
              <div className="mt-4 bg-secondary h-2 rounded-full">
                <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">45% complete</p>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "assignments") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Assignments</h2>
          <div className="flex gap-2 mb-4">
            <Button variant="default">All</Button>
            <Button variant="outline">Pending</Button>
            <Button variant="outline">Submitted</Button>
            <Button variant="outline">Graded</Button>
          </div>
          <div className="border rounded-lg">
            <div className="grid grid-cols-5 p-3 bg-muted font-semibold">
              <div>Course</div>
              <div>Assignment</div>
              <div>Due Date</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            <div className="grid grid-cols-5 p-3 border-t items-center">
              <div>Mathematics</div>
              <div>Algebra Problem Set</div>
              <div>Oct 15, 2023</div>
              <div><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span></div>
              <div><Button size="sm">Submit</Button></div>
            </div>
            <div className="grid grid-cols-5 p-3 border-t items-center">
              <div>Physics</div>
              <div>Lab Report</div>
              <div>Oct 18, 2023</div>
              <div><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span></div>
              <div><Button size="sm">Submit</Button></div>
            </div>
            <div className="grid grid-cols-5 p-3 border-t items-center">
              <div>Computer Science</div>
              <div>Programming Project</div>
              <div>Oct 10, 2023</div>
              <div><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Graded: 95%</span></div>
              <div><Button variant="outline" size="sm">View</Button></div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "schedule") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Class Schedule</h2>
          <div className="flex gap-4 mb-6">
            <Button variant="default">This Week</Button>
            <Button variant="outline">Next Week</Button>
            <Button variant="outline">Month View</Button>
          </div>
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-8 gap-2 text-center font-semibold mb-4">
              <div className="p-2">Time</div>
              <div className="p-2 bg-muted rounded">Mon</div>
              <div className="p-2">Tue</div>
              <div className="p-2">Wed</div>
              <div className="p-2">Thu</div>
              <div className="p-2">Fri</div>
              <div className="p-2">Sat</div>
              <div className="p-2 bg-muted rounded">Sun</div>
            </div>
            <div className="grid grid-cols-8 gap-2 text-center mb-2">
              <div className="p-2 font-medium">9:00 AM</div>
              <div className="p-2 bg-muted rounded">Math</div>
              <div className="p-2"></div>
              <div className="p-2">Physics</div>
              <div className="p-2"></div>
              <div className="p-2">Math</div>
              <div className="p-2"></div>
              <div className="p-2 bg-muted rounded"></div>
            </div>
            <div className="grid grid-cols-8 gap-2 text-center mb-2">
              <div className="p-2 font-medium">11:00 AM</div>
              <div className="p-2 bg-muted rounded"></div>
              <div className="p-2 bg-blue-100 rounded">CS Lab</div>
              <div className="p-2"></div>
              <div className="p-2 bg-blue-100 rounded">CS Lab</div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2 bg-muted rounded"></div>
            </div>
            <div className="grid grid-cols-8 gap-2 text-center">
              <div className="p-2 font-medium">2:00 PM</div>
              <div className="p-2 bg-muted rounded">Physics</div>
              <div className="p-2">Literature</div>
              <div className="p-2"></div>
              <div className="p-2">Literature</div>
              <div className="p-2">Physics</div>
              <div className="p-2"></div>
              <div className="p-2 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "certs") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">My Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="font-semibold">Literature Appreciation</h3>
              <p className="text-muted-foreground mt-2">Completed on September 15, 2023</p>
              <Button className="mt-4">Download Certificate</Button>
            </div>
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <Trophy className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="font-semibold">Mathematics 101</h3>
              <p className="text-muted-foreground mt-2">In progress (65% complete)</p>
              <Button variant="outline" className="mt-4" disabled>Not Yet Available</Button>
            </div>
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <Trophy className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="font-semibold">Physics Fundamentals</h3>
              <p className="text-muted-foreground mt-2">In progress (30% complete)</p>
              <Button variant="outline" className="mt-4" disabled>Not Yet Available</Button>
            </div>
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <Trophy className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="font-semibold">Computer Science Basics</h3>
              <p className="text-muted-foreground mt-2">In progress (45% complete)</p>
              <Button variant="outline" className="mt-4" disabled>Not Yet Available</Button>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "payments") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Payment History</h2>
          <div className="border rounded-lg">
            <div className="grid grid-cols-5 p-3 bg-muted font-semibold">
              <div>Date</div>
              <div>Description</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Invoice</div>
            </div>
            <div className="grid grid-cols-5 p-3 border-t items-center">
              <div>Sep 5, 2023</div>
              <div>Semester Tuition - Mathematics 101</div>
              <div>$299.00</div>
              <div><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Paid</span></div>
              <div><Button variant="outline" size="sm">Download</Button></div>
            </div>
            <div className="grid grid-cols-5 p-3 border-t items-center">
              <div>Sep 10, 2023</div>
              <div>Semester Tuition - Physics Fundamentals</div>
              <div>$299.00</div>
              <div><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Paid</span></div>
              <div><Button variant="outline" size="sm">Download</Button></div>
            </div>
            <div className="grid grid-cols-5 p-3 border-t items-center">
              <div>Oct 1, 2023</div>
              <div>Lab Fee - Computer Science</div>
              <div>$50.00</div>
              <div><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span></div>
              <div><Button variant="outline" size="sm" disabled>Download</Button></div>
            </div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Outstanding Balance: $50.00</h3>
            <Button>Pay Now</Button>
          </div>
        </div>
      );
    } else if (activeTab === "support") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Support Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Contact Support</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="What do you need help with?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea className="w-full p-2 border rounded h-32" placeholder="Please describe your issue in detail..."></textarea>
                </div>
                <Button>Submit Request</Button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">FAQ & Resources</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">How do I submit assignments?</h4>
                  <p className="text-sm text-muted-foreground mt-1">Learn how to upload and submit your assignments through the portal.</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">When are tuition payments due?</h4>
                  <p className="text-sm text-muted-foreground mt-1">Information about payment deadlines and methods.</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">How to access recorded lectures?</h4>
                  <p className="text-sm text-muted-foreground mt-1">Find all your course recordings in one place.</p>
                </div>
                <Button variant="outline" className="w-full">View All FAQs</Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "settings") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input type="text" className="w-full p-2 border rounded" value="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input type="text" className="w-full p-2 border rounded" value="Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full p-2 border rounded" value="john.doe@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input type="tel" className="w-full p-2 border rounded" value="(555) 123-4567" />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Security</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">Change Password</Button>
                  <Button variant="outline" className="w-full justify-start">Two-Factor Authentication</Button>
                  <Button variant="outline" className="w-full justify-start">Connected Devices</Button>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Email Notifications</label>
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Assignment Reminders</label>
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Course Updates</label>
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Promotional Offers</label>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                </div>
                <Button className="mt-4">Save Preferences</Button>
              </div>
            </div>
          </div>
        </div>
      );
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
          <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
          <SidebarItem icon={<ListChecks className="h-4 w-4" />} label="Assignments" active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')} />
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
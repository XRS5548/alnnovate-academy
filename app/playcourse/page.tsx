"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  CheckCircle,
  Download,
  Share2,
  Menu,
  X,
  Home,
  User,
  Mail,
  Bookmark,
  HelpCircle,
  Settings,
  GaugeCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Video data
const courseData = {
  title: "Advanced React Development",
  instructor: "Sarah Johnson",
  description: "Learn advanced React concepts including hooks, state management, performance optimization, and testing.",
  videos: [
    {
      id: 1,
      title: "Introduction to React Hooks",
      duration: "15:30",
      completed: true,
      thumbnail: "/api/placeholder/200/120"
    },
    {
      id: 2,
      title: "Understanding useState and useEffect",
      duration: "22:45",
      completed: true,
      thumbnail: "/api/placeholder/200/120"
    },
    {
      id: 3,
      title: "Custom Hooks Deep Dive",
      duration: "28:15",
      completed: false,
      thumbnail: "/api/placeholder/200/120"
    },
    {
      id: 4,
      title: "Context API and useReducer",
      duration: "25:20",
      completed: false,
      thumbnail: "/api/placeholder/200/120"
    },
    {
      id: 5,
      title: "Performance Optimization Techniques",
      duration: "32:10",
      completed: false,
      thumbnail: "/api/placeholder/200/120"
    },
    {
      id: 6,
      title: "Testing React Applications",
      duration: "29:45",
      completed: false,
      thumbnail: "/api/placeholder/200/120"
    },
    {
      id: 7,
      title: "Deployment Strategies",
      duration: "18:30",
      completed: false,
      thumbnail: "/api/placeholder/200/120"
    }
  ]
};


export default function CoursePlayer() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleVideoSelect = (index:number) => {
    setCurrentVideo(index);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value:number) => {
    setProgress(value);
  };

  const formatTime = (seconds:number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="font-semibold text-lg">{courseData.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Resources
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 border-r bg-card overflow-y-auto hidden md:block">
            <div className="p-4">
              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-2">Course Content</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{courseData.videos.length} lessons</span>
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  <span>3h 12m total</span>
                </div>
              </div>

              <div className="space-y-2">
                {courseData.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${currentVideo === index ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    onClick={() => handleVideoSelect(index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-16 h-10 bg-muted-foreground/20 rounded flex items-center justify-center">
                          {video.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </div>
                        <div className="absolute bottom-1 right-1 bg-background/80 text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">
                          {index + 1}. {video.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Video Player */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="bg-black/50 rounded-full p-4 inline-block mb-4">
                  {isPlaying ? (
                    <Pause className="h-10 w-10" onClick={togglePlay} />
                  ) : (
                    <Play className="h-10 w-10" onClick={togglePlay} />
                  )}
                </div>
                <p className="text-sm">Click to {isPlaying ? 'pause' : 'play'}</p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <Progress value={progress} className="w-full mb-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white h-9 w-9">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white h-9 w-9">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{formatTime(Math.floor(progress * 180 / 100))} / {formatTime(180)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white h-9 w-9">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-6 overflow-y-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {currentVideo + 1}. {courseData.videos[currentVideo].title}
                    </h2>
                    <p className="text-muted-foreground">Instructor: {courseData.instructor}</p>
                  </div>
                  <Badge variant={courseData.videos[currentVideo].completed ? "default" : "outline"}>
                    {courseData.videos[currentVideo].completed ? "Completed" : "In Progress"}
                  </Badge>
                </div>

                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {courseData.description} This lesson covers important concepts and techniques that will help you
                      build better React applications. We will explore best practices and common patterns used in
                      production applications.
                    </p>
                  </CardContent>
                </Card>

                <div className="flex gap-4 mb-6">
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Slides
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Card className="hover:bg-muted/50 cursor-pointer">
                      <CardContent className="p-3 flex items-center">
                        <div className="bg-primary/10 p-2 rounded mr-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Course Notes</p>
                          <p className="text-xs text-muted-foreground">PDF Document</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="hover:bg-muted/50 cursor-pointer">
                      <CardContent className="p-3 flex items-center">
                        <div className="bg-primary/10 p-2 rounded mr-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Code Examples</p>
                          <p className="text-xs text-muted-foreground">ZIP Archive</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Navigation Cards */}
              <div className="w-full lg:w-72 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Course Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span>2/{courseData.videos.length}</span>
                      </div>
                      <Progress value={(2 / courseData.videos.length) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">Keep going! You are doing great.</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    disabled={currentVideo === 0}
                    onClick={() => handleVideoSelect(currentVideo - 1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button 
                    className="flex-1"
                    disabled={currentVideo === courseData.videos.length - 1}
                    onClick={() => handleVideoSelect(currentVideo + 1)}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Instructor</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        SJ
                      </div>
                      <div>
                        <p className="text-sm font-medium">{courseData.instructor}</p>
                        <p className="text-xs text-muted-foreground">Senior React Developer</p>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <p className="text-sm text-muted-foreground">
                      Sarah has over 8 years of experience building web applications with React and teaching developers.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

     
    </div>
  );
}
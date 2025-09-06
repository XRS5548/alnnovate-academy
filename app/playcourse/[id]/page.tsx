"use client";

import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  BookOpen,
  Clock,
  CheckCircle,
  Download,
  Share2,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";

interface Resource {
  name: string;
  url: string;
}

interface Video {
  name: string;
  description: string;
  url: string;
  resources: Resource[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  resources: Resource[];
  instructor?: string;
}

export default function CoursePlayer() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/playcourse/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data: Course = await res.json();
        setCourse(data); // ✅ direct set karo
      } catch (err) {
        console.error("❌ Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading course...</p>;
  }

  if (!course) {
    return <p className="text-center py-10 text-red-500">Course not found.</p>;
  }

  const handleVideoSelect = (index: number) => {
    setCurrentVideo(index);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="font-semibold text-lg">{course.title}</h1>
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
                  <span>{course.videos.length} lessons</span>
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  <span>Total Duration</span>
                </div>
              </div>

              <div className="space-y-2">
                {course.videos.map((video, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentVideo === index
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => handleVideoSelect(index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-16 h-10 bg-muted-foreground/20 rounded flex items-center justify-center">
                          <Play className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">
                          {index + 1}. {video.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {video.description}
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
          <div className="relative aspect-video bg-black flex items-center justify-center text-white">
            <p>Now Playing: {course.videos[currentVideo].name}</p>
          </div>

          {/* Video Info */}
          <div className="p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">
              {currentVideo + 1}. {course.videos[currentVideo].name}
            </h2>
            <p className="text-muted-foreground">
              Instructor: {course.instructor ?? "Unknown"}
            </p>
            <Separator className="my-4" />
            <p>{course.videos[currentVideo].description}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

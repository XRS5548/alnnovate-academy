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
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
interface OnProgressProps {
  played: number;        // 0–1 (fraction played)
  playedSeconds: number; // seconds
  loaded: number;        // 0–1 (fraction loaded)
  loadedSeconds: number; // seconds
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
        setCourse(data);
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
  }
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
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${currentVideo === index
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
          {/* ✅ React Player integrated */}
          <div className="relative aspect-video bg-black">
            <ReactPlayer
              key={currentVideo}
              src={course.videos[currentVideo].url}
              playing={isPlaying}
              controls
              width="100%"
              height="100%"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>




          {/* Video Info */}
          <div className="p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">
              {currentVideo + 1}. {course.videos[currentVideo].name}
            </h2>

            <Separator className="my-4" />
            <p>{course.videos[currentVideo].description}</p>
          </div>

          {(course.videos[currentVideo].resources.length > 1 )?<Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Url</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {course.videos[currentVideo].resources.map((res) => (
                <TableRow key={res.url}>
                  <TableCell className="font-medium">{res.name}</TableCell>
                  <TableCell><a href={res.url} target="_blank"><ArrowUpRight/> Open</a></TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{course.videos[currentVideo].resources.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          :<p className="text-center bg-secondary p-20">No any resources</p>
            }

          {/* {course.videos[currentVideo].resources.map(res=>{
            return 
          })} */}


        </main>
      </div>
    </div>
  );
}

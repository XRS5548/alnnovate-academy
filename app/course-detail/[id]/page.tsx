"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "next/font/google";
import { MoveRight } from "lucide-react";

interface VideoResource {
  name: string;
  url: string;
}

interface Video {
  name: string;
  description: string;
  url: string;
  resources: VideoResource[];
}

interface CourseDetail {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  price: number;
  level: string;
  category: string;
  language: string;
  tags: string[];
  videos?: Video[]; // 👈 only available if enrolled
  instructor?: {
    name: string;
    email: string;
  } | null;
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data: CourseDetail = await res.json();
        if (res.ok) {
          setCourse(data);
        }
      } catch (error) {
        console.error("Error fetching course detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!id) return;
    try {
      setEnrolling(true);
      const res = await fetch(`/api/courses/${id}/enroll`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        const refreshed = await fetch(`/api/courses/${id}`);
        if (refreshed.ok) {
          const updated: CourseDetail = await refreshed.json();
          setCourse(updated);
        }
      } else {
        alert(data.message || "Enrollment failed");
      }
    } catch (err) {
      console.error("Enroll error:", err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-muted-foreground">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-muted-foreground">Course not found.</p>
      </div>
    );
  }

  const isEnrolled = !!course.videos;

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground mb-4">{course.description}</p>
          <p className="mb-2">
            <span className="font-semibold">Duration:</span> {course.duration} hours
          </p>
          <p className="mb-2">
            <span className="font-semibold">Level:</span> {course.level}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Category:</span> {course.category}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Language:</span> {course.language}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Instructor:</span>{" "}
            {course.instructor ? course.instructor.name : "Unknown"}
          </p>
          <p className="text-xl font-bold text-primary mb-6">₹ {course.price}</p>

          {!isEnrolled ? (
            <Button size="lg" onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? "Enrolling..." : "Enroll & Start Learning"}
            </Button>
          ) : (
            <Button size="lg" onClick={() => router.push("/playcourse/"+id)}>
              <MoveRight /> Continue Learning
            </Button>
          )}
        </div>
        <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Videos (locked for non-enrolled users) */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Course Content</h2>
        {!isEnrolled ? (
          <p className="text-muted-foreground">
            Please enroll to unlock all videos & resources.
          </p>
        ) : course.videos && course.videos.length > 0 ? (
          <div className="space-y-6">
            {course.videos.map((video, idx) => (
              <div key={idx} className="p-5 rounded-lg border bg-card shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{video.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {video.description}
                </p>
                <video
                  src={video.url}
                  controls
                  className="w-full rounded-lg mb-3"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No videos available.</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CourseResponse {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  price: number;
  level: string;
  category: string;
  language: string;
  instructor?: {
    name: string;
    email: string;
  } | null;
}

export default function PopularCourses() {
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses?page=1&limit=4");
        const data = await res.json();
        if (res.ok) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Popular Courses
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Upgrade your skills with our most in-demand programs designed for the
          future of technology.
        </motion.p>

        {/* Loader */}
        {loading && <p className="text-muted-foreground">Loading courses...</p>}

        {/* Courses Grid */}
        {!loading && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="rounded-2xl border bg-background shadow-sm hover:shadow-lg overflow-hidden group"
              >
                {/* Image */}
                <div className="relative w-full h-40">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {course.description}
                  </p>
                  <p className="text-xs font-medium text-primary mb-4">
                    ⏳ Duration: {course.duration} hours
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => router.push(`/course-detail/${course._id}`)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No courses fallback */}
        {!loading && courses.length === 0 && (
          <p className="text-muted-foreground">No courses found.</p>
        )}
      </div>

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface CourseResponse {
  _id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  language: string;
  duration: number;
  price: number;
  tags: string[];
  thumbnail: string;
  instructor: {
    name: string;
    email: string;
  } | null;
  createdAt: string;
}

interface PaginatedResponse {
  courses: CourseResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function CoursesList() {
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [language, setLanguage] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          search,
          category,
          level,
          language,
          page: page.toString(),
          limit: "8",
        });

        const res = await fetch(`/api/courses/advance?${params.toString()}`);
        const data: PaginatedResponse = await res.json();

        if (res.ok) {
          setCourses(data.courses || []);
          setPages(data.pagination.pages);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [search, category, level, language, page]);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Heading with red ball animation */}
        <div className="relative flex items-center justify-center mb-10">
          <motion.div
            className="absolute -left-8 w-4 h-4 bg-red-500 rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center"
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Courses
            </span>
          </motion.h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="max-w-xs"
          />

          <Select
            value={category}
            onValueChange={(val) => {
              setPage(1);
              setCategory(val);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={level}
            onValueChange={(val) => {
              setPage(1);
              setLevel(val);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={language}
            onValueChange={(val) => {
              setPage(1);
              setLanguage(val);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loader */}
        {loading && (
          <p className="text-muted-foreground text-center">Loading courses...</p>
        )}

        {/* Courses Grid */}
        {!loading && courses.length > 0 && (
          <>
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
                    <h3 className="text-lg font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {course.description}
                    </p>
                    <p className="text-xs font-medium text-primary mb-2">
                      ⏳ Duration: {course.duration} hours
                    </p>
                    <p className="text-xs mb-2">
                      💰 {course.price === 0 ? "Free" : `₹${course.price}`}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() =>
                        router.push(`/course-detail/${course._id}`)
                      }
                    >
                      Enroll Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-10">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="self-center text-sm">
                Page {page} of {pages}
              </span>
              <Button
                variant="outline"
                disabled={page >= pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}

        {/* No courses fallback */}
        {!loading && courses.length === 0 && (
          <p className="text-muted-foreground text-center">No courses found.</p>
        )}
      </div>

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}

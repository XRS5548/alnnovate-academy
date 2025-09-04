'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, BookOpen, PlusCircle, Calendar, Clock, Languages, Edit, Eye } from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  level: string;
  category: string;
  language: string;
  duration: number;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  courses: Course[];
}

export default function DashboardCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/mycourses', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch courses: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      setCourses(data.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryVariant = (category: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      programming: "default",
      design: "secondary",
      business: "outline",
      marketing: "destructive",
      mobileapp: "default",
    };
    
    return variants[category.toLowerCase()] || "outline";
  };

  const getLevelVariant = (level: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      beginner: "default",
      intermediate: "secondary",
      advanced: "destructive",
    };
    
    return variants[level.toLowerCase()] || "outline";
  };

  if (loading) {
    return (
      <div className="w-full py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
          <Button onClick={fetchMyCourses} className="mt-4">
            Try Again
          </Button>
        </Alert>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="w-full py-6">
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="text-2xl mb-2">No courses yet</CardTitle>
            <CardDescription className="mb-6 max-w-md">
              Get started by creating your first course and sharing your knowledge with others.
            </CardDescription>
            <Button asChild>
              <Link href="/courses/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Course
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course._id} className="overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={course.thumbnail || '/placeholder-course.jpg'}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant={getLevelVariant(course.level)}>
                  {course.level}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant={getCategoryVariant(course.category)}>
                  {course.category}
                </Badge>
                <span className="text-lg font-bold text-foreground">${course.price}</span>
              </div>
              
              <CardTitle className="text-lg line-clamp-2 mb-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration} hours</span>
                </div>
                <div className="flex items-center">
                  <Languages className="h-4 w-4 mr-1" />
                  <span>{course.language}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {course.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{course.tags.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Created: {formatDate(course.createdAt)}</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href={`/courses/${course._id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href={`/courses/${course._id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
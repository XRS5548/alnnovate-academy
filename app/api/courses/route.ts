import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId, Filter, WithId, Document } from 'mongodb';

// Interface for course document
interface Course {
  _id: ObjectId;
  title: string;
  level: string;
  category: string;
  language: string;
  duration: number;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string;
  videos: Video[];
  instructorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for video document
interface Video {
  name: string;
  description: string;
  resources: VideoResource[];
  url: string;
}

// Interface for video resource
interface VideoResource {
  name: string;
  url: string;
}

// Interface for user document (minimal fields needed)
interface User {
  _id: ObjectId;
  name: string;
  email: string;
}

// Interface for course response (without ObjectId)
interface CourseResponse {
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
  instructor: {
    name: string;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for paginated response
interface PaginatedResponse {
  courses: CourseResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Type for course filter
type CourseFilter = Filter<Course>;

export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;
  
  try {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
    const courses = db.collection<Course>('courses');
    const users = db.collection<User>('users');

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const language = searchParams.get('language');
    const search = searchParams.get('search');

    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json(
        { message: "Page must be at least 1" },
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { message: "Limit must be between 1 and 50" },
        { status: 400 }
      );
    }

    // Build filter object with proper typing
    const filter: CourseFilter = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (level && level !== 'all') {
      filter.level = level;
    }
    
    if (language && language !== 'all') {
      filter.language = language;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch courses with filter, pagination, and sorting (newest first)
    const courseList = await courses
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination info
    const total = await courses.countDocuments(filter);

    // Get instructor names for each course
    const coursesWithInstructor: CourseResponse[] = await Promise.all(
      courseList.map(async (course) => {
        const instructor = await users.findOne(
          { _id: course.instructorId },
          { projection: { name: 1, email: 1 } }
        );
        
        return {
          _id: course._id.toString(),
          title: course.title,
          level: course.level,
          category: course.category,
          language: course.language,
          duration: course.duration,
          price: course.price,
          description: course.description,
          tags: course.tags,
          thumbnail: course.thumbnail,
          instructor: instructor ? {
            name: instructor.name,
            email: instructor.email
          } : null,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt
        };
      })
    );

    // Prepare response
    const response: PaginatedResponse = {
      courses: coursesWithInstructor,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
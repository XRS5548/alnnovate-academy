import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId, PushOperator } from 'mongodb';
import * as jwt from 'jsonwebtoken';

// Interfaces for type safety
interface VideoResource {
  name: string;
  url: string;
}

interface Video {
  name: string;
  description: string;
  resources: VideoResource[];
  url: string;
}

interface Course {
  _id?: ObjectId;
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

interface User {
  _id: ObjectId;
  createdCourses?: ObjectId[];
  // Add other user fields as needed
}

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function POST(request: NextRequest) {
  let client: MongoClient | null = null;
  
  try {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
    const courses = db.collection<Course>('courses');
    const users = db.collection<User>('users');

    // Check for authentication token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    // Verify JWT token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (jwtError) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate required fields
    const {
      title,
      level,
      category,
      language,
      duration,
      price,
      description,
      tags,
      thumbnail,
      videos
    } = requestBody;

    if (!title || !level || !category || !language || !description || !thumbnail) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert tags from string to array if needed
    let tagsArray: string[];
    if (typeof tags === 'string') {
      tagsArray = tags.split(',').map(tag => tag.trim());
    } else if (Array.isArray(tags)) {
      tagsArray = tags;
    } else {
      tagsArray = [];
    }

    // Create course object
    const courseData: Course = {
      title,
      level,
      category,
      language,
      duration: Number(duration) || 0,
      price: Number(price) || 0,
      description,
      tags: tagsArray,
      thumbnail,
      videos: videos || [],
      instructorId: new ObjectId(decoded.id),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert course into database
    const result = await courses.insertOne(courseData);
    
    // Update user's created courses - fixed the type issue
    await users.updateOne(
      { _id: new ObjectId(decoded.id) },
      { $push: { createdCourses: result.insertedId } as PushOperator<User> }
    );

    return NextResponse.json(
      { 
        message: "Course created successfully", 
        courseId: result.insertedId 
      },
      { status: 201 }
    );

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

// GET endpoint to fetch courses
export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;
  
  try {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
    const courses = db.collection<Course>('courses');

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const language = searchParams.get('language');

    // Build filter object with proper typing
    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (language) filter.language = language;

    // Validate pagination parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { message: "Invalid page parameter" },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { message: "Invalid limit parameter. Must be between 1 and 100" },
        { status: 400 }
      );
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch courses with filter and pagination
    const courseList = await courses
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination info
    const total = await courses.countDocuments(filter);

    return NextResponse.json({
      courses: courseList,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

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
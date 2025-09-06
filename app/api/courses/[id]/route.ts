import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

// Interfaces
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

interface User {
  _id: ObjectId;
  enrolledCourses?: ObjectId[];
}

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

interface CoursePublicResponse {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  level: string;
  category: string;
  language: string;
  duration: number;
  tags: string[];
  videos?: Video[]; // 👈 only when enrolled
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  let client: MongoClient | null = null;

  try {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();

    const db = client.db("maindatabase");
    const courses = db.collection<Course>("courses");
    const users = db.collection<User>("users");

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid course ID" },
        { status: 400 }
      );
    }

    const course = await courses.findOne({ _id: new ObjectId(id) });
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Default response without videos
    const courseResponse: CoursePublicResponse = {
      _id: course._id.toString(),
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      price: course.price,
      level: course.level,
      category: course.category,
      language: course.language,
      duration: course.duration,
      tags: course.tags,
    };

    // If token exists, check enrollment
    const token = request.cookies.get("token")?.value;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await users.findOne({ _id: new ObjectId(decoded.id) });

        const isEnrolled =
          user?.enrolledCourses?.some(
            (c: ObjectId) => c.toString() === id
          ) ?? false;

        if (isEnrolled) {
          courseResponse.videos = course.videos; // ✅ strict typed
        }
      } catch {
        // ignore invalid token → only return public info
      }
    }

    return NextResponse.json(courseResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

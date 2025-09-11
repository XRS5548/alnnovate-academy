import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId, Filter } from "mongodb";

// Course interface
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
  instructorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  _id: ObjectId;
  name: string;
  email: string;
}

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

interface PaginatedResponse {
  courses: CourseResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

type CourseFilter = Filter<Course>;

export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
    const courses = db.collection<Course>("courses");
    const users = db.collection<User>("users");

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const language = searchParams.get("language");
    const search = searchParams.get("search");

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

    // filters
    const filter: CourseFilter = {};
    if (category && category !== "all") filter.category = category;
    if (level && level !== "all") filter.level = level;
    if (language && language !== "all") filter.language = language;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const courseList = await courses
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await courses.countDocuments(filter);

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
          instructor: instructor
            ? { name: instructor.name, email: instructor.email }
            : null,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
        };
      })
    );

    const response: PaginatedResponse = {
      courses: coursesWithInstructor,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

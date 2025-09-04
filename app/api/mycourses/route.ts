import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from 'mongodb';
import * as jwt from 'jsonwebtoken';

// Interface for user document
interface User {
  _id: ObjectId;
  email: string;
  name: string;
  createdCourses?: ObjectId[];
  enrolledCourses?: ObjectId[];
}

// JWT payload interface
interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;
  
  try {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
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

    const userId = new ObjectId(decoded.id);

    // Find user and get created courses
    const user = await users.findOne(
      { _id: userId },
      { projection: { createdCourses: 1 } }
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return the course IDs created by the user
    return NextResponse.json({
      createdCourseIds: user.createdCourses || []
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



// Additional endpoint to get full course details created by user
export async function POST(request: NextRequest) {
  let client: MongoClient | null = null;
  
  try {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
    const users = db.collection<User>('users');
    const courses = db.collection('courses');

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

    const userId = new ObjectId(decoded.id);

    // Find user and get created courses
    const user = await users.findOne(
      { _id: userId },
      { projection: { createdCourses: 1 } }
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // If no courses created, return empty array
    if (!user.createdCourses || user.createdCourses.length === 0) {
      return NextResponse.json({
        courses: []
      });
    }

    // Get full course details for the created courses
    const courseDetails = await courses
      .find({ _id: { $in: user.createdCourses } })
      .toArray();

    return NextResponse.json({
      courses: courseDetails
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
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

interface User {
  _id: ObjectId;
  enrolledCourses?: ObjectId[];
}

interface Course {
  _id: ObjectId;
}

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  let client: MongoClient | null = null;

  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.id;

    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();

    const db = client.db("maindatabase");
    const users = db.collection<User>("users");
    const courses = db.collection<Course>("courses");

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

    // Enroll user (no duplicates)
    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { enrolledCourses: new ObjectId(id) } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Already enrolled in this course" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Enrolled successfully", courseId: id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enroll API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

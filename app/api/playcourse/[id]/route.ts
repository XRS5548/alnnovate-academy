// app/api/playcourse/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_URL as string;
if (!uri) throw new Error("❌ Missing MONGO_URL");

let client: MongoClient | null = null;
async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }   // 👈 params is a Promise now
) {
  try {
    const { id } = await context.params;          // 👈 await lagana zaruri hai

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid course ID" }, { status: 400 });
    }

    const db = (await getClient()).db("maindatabase");
    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: course._id,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      videos: course.videos ?? [],   // safe fallback
      resources: course.resources ?? [],
    });
  } catch (err) {
    console.error("Error fetching course:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

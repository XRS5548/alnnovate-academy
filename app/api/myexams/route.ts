import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";

const uri = process.env.MONGO_URL as string;
if (!uri) {
  throw new Error("❌ Missing MONGO_URL in environment variables");
}

let client: MongoClient | null = null;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized request" }, { status: 401 });
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch {
      return NextResponse.json({ message: "Unauthorized request" }, { status: 401 });
    }

    const userId = decoded.id;
    if (!userId) {
      return NextResponse.json({ message: "Invalid token payload" }, { status: 401 });
    }

    const dbClient = await getClient();
    const db = dbClient.db("maindatabase");

    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const examIds = user.createdExams || [];
    const exams = await db
      .collection("exams")
      .find(
        { _id: { $in: examIds } },
        { projection: { _id: 1, name: 1, thumbnail: 1 } } // ✅ Only return required fields
      )
      .toArray();

    return NextResponse.json({ success: true, exams }, { status: 200 });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

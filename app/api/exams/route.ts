import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

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



export async function GET(request: NextRequest) {
  try {
      


    const dbClient = await getClient();
    const db = dbClient.db("maindatabase");


    const exams = await db
      .collection("exams")
      .find()
      .toArray();

    return NextResponse.json({ success: true, exams }, { status: 200 });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

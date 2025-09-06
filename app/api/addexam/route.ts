import { NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import jwt, { JwtPayload } from "jsonwebtoken"

const uri = process.env.MONGO_URL as string
if (!uri) {
  throw new Error("❌ Missing MONGO_URL in environment variables")
}

let client: MongoClient | null = null

async function getClient() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client
}

// ✅ Define User interface
interface User {
  _id: ObjectId
  email: string
  password: string
  createdExams?: ObjectId[]
}

// ✅ Define Exam interface
interface Exam {
  name: string
  duration: string
  fee: string
  thumbnail: string
  mcqs: { question: string; options: string[]; marks: string }[]
  longQuestions: { question: string; marks: string }[]
  codingProblems: { problem: string; marks: string }[]
  createdAt: Date
  createdBy: ObjectId
}

// ✅ Define JWT payload type
interface DecodedToken extends JwtPayload {
  id: string
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }

    let decoded: DecodedToken
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
    } catch {
      return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }

    const userId = decoded.id
    if (!userId) {
      return NextResponse.json({ message: "Invalid token payload" }, { status: 401 })
    }

    const body = await request.json()

    // ✅ Validate exam structure
    if (
      typeof body.name !== "string" ||
      typeof body.duration !== "string" ||
      typeof body.fee !== "string" ||
      typeof body.thumbnail !== "string" ||
      !Array.isArray(body.mcqs) ||
      !Array.isArray(body.longQuestions) ||
      !Array.isArray(body.codingProblems)
    ) {
      return NextResponse.json({ message: "Invalid exam format" }, { status: 400 })
    }

    const dbClient = await getClient()
    const db = dbClient.db("maindatabase")

    const exams = db.collection<Exam>("exams")
    const users = db.collection<User>("users")

    const exam: Exam = {
      name: body.name,
      duration: body.duration,
      fee: body.fee,
      thumbnail: body.thumbnail,
      mcqs: body.mcqs,
      longQuestions: body.longQuestions,
      codingProblems: body.codingProblems,
      createdAt: new Date(),
      createdBy: new ObjectId(userId),
    }

    const result = await exams.insertOne(exam)

    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { createdExams: result.insertedId } }
    )

    return NextResponse.json(
      { success: true, examId: result.insertedId },
      { status: 201 }
    )
  } catch (err) {
    console.error("❌ API Error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

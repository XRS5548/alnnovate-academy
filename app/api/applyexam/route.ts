import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// ------------------ User schema type ------------------
interface AppliedExam {
  examId: ObjectId;
  appliedAt: Date;
  status: "pending" | "approved" | "rejected";
}

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  appliedExams?: AppliedExam[];
}

// ------------------ API handler ------------------
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const examId = body.examId as string;

    if (!examId) {
      return NextResponse.json({ message: "Exam ID required" }, { status: 400 });
    }

    // connect DB
    const client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
    const users = db.collection<User>("users");
    const exams = db.collection("exams");

    // verify token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded: JwtPayload & { id?: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
        id?: string;
      };
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const loggedInUserId = decoded.id;
    if (!loggedInUserId) {
      return NextResponse.json({ message: "Invalid token payload" }, { status: 401 });
    }

    // check exam exists
    const examInfo = await exams.findOne({ _id: new ObjectId(examId) });
    if (!examInfo) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    // check user exists
    const userInfo = await users.findOne({ _id: new ObjectId(loggedInUserId) });
    if (!userInfo) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // check if already applied
    const alreadyApplied = await users.findOne({
      _id: new ObjectId(loggedInUserId),
      "appliedExams.examId": new ObjectId(examId),
    });

    if (alreadyApplied) {
      return NextResponse.json(
        { message: "You have already applied for this exam" },
        { status: 400 }
      );
    }

    // update appliedExams array
    await users.updateOne(
      { _id: new ObjectId(loggedInUserId) },
      {
        $push: {
          appliedExams: {
            examId: new ObjectId(examId),
            appliedAt: new Date(),
            status: "pending",
          } as AppliedExam,
        },
      }
    );

    return NextResponse.json({
      message: "Successfully applied for exam",
      examId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

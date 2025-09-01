import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, remember } = body;

    const client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("maindatabase");
    const users = db.collection("users");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // find user
    const user = await users.findOne({ email });

    // agar user hi nahi mila ya password galat hai -> dono ke liye same msg
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // token expiry logic
    const expiresIn = remember ? "7d" : "1h";

    // generate JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn }
    );

    // prepare response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.fullName || "",
        },
      },
      { status: 200 }
    );

    // set cookie (httpOnly for security)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict",
      maxAge: remember ? 60 * 60 * 24 * 7 : 60 * 60, // 7d vs 1h
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

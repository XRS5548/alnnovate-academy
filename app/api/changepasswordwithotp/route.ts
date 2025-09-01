// app/api/changepasswordwithotp/route.ts
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGO_URL!);


export async function POST(req: Request) {
  try {
    const { email, otp, password, confirmPassword } = await req.json();
    console.log(otp)

    if (!email || !otp || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match." },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db("maindatabase");
    const users = db.collection("users");

    const user = await users.findOne({ email });
    console.log(user )
    if (!user || !user.resetOtp || !user.resetOtpExpires) {
      return NextResponse.json(
        { success: false, message: "OTP not found. Please request again." },
        { status: 400 }
      );
    }

    // Check OTP validity
    if (user.resetOtp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP." },
        { status: 400 }
      );
    }

    if (Date.now() > user.resetOtpExpires) {
      return NextResponse.json(
        { success: false, message: "OTP expired." },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password + clear OTP fields
    await users.updateOne(
      { email },
      {
        $set: { password: hashedPassword },
        $unset: { resetOtp: "", resetOtpExpires: "", otpVerified: "" },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}

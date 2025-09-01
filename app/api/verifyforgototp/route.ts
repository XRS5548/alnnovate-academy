// app/api/verifyforgototp/route.ts
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGO_URL!);

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db("maindatabase");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user || !user.resetOtp || !user.resetOtpExpires) {
      return NextResponse.json(
        { success: false, message: "OTP not requested or invalid." },
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

    // ✅ Clear OTP after verification (optional)
    // await users.updateOne(
    //   { email },
    //   { $set: { otpVerified: true }, $unset: { resetOtp: "", resetOtpExpires: "" } }
    // );

    return NextResponse.json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}

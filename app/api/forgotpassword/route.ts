// app/api/forgotpassword/route.ts
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import crypto from "crypto";
import { sendEmail } from "@/lib/emailservice";
import { render } from "@react-email/render";
import { VerificationEmail } from "@/components/emails/verificationCodeEmail";

// ⚡ MongoDB connection string
const client = new MongoClient(process.env.MONGO_URL!);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    await client.connect();
    const db = client.db("maindatabase");
    const users = db.collection("users");

    // Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP with expiry (5 min)
    const updatinfo = await users.updateOne(
      { email },
      { $set: { resetOtp: otp, resetOtpExpires: Date.now() + 5 * 60 * 1000 } }
    );
    console.log(updatinfo.upsertedCount)
    // ✅ TODO: send OTP via email service (e.g., Resend, Nodemailer, etc.)
    console.log("Generated OTP for", email, ":", otp);
    await sendEmail({
      to:email,
      template:await render(VerificationEmail({
        firstName:user.fullName,
        code:otp
      })),
      subject:"Reset Password OTP"
    })
    return NextResponse.json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}

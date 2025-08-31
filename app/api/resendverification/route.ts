// app/api/resendverification/route.ts
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { generateVerificationCode, sendEmail } from "@/lib/emailservice";
import { VerificationEmail } from "@/components/emails/verificationCodeEmail";
import { render } from "@react-email/render";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const client = new MongoClient(process.env.MONGO_URL!);
        await client.connect();
        const db = client.db("maindatabase");
        const users = db.collection("users");

        // Find user
        const user = await users.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        
        console.log(user['fullName'])

        if (user.verified) {
            return NextResponse.json(
                { message: "Email is already verified" },
                { status: 400 }
            );
        }

        // Generate new code
        const newCode = generateVerificationCode();

        console.log(newCode)
        // Update DB
        const result = await users.updateOne(
            { email: email.trim().toLowerCase() },
            { $set: { verificationCode: newCode } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "User not found while updating code" },
                { status: 404 }
            );
        }


        // Send email
        const successMail = await sendEmail({
            to: email,
            template: await render(
                VerificationEmail({
                    firstName: user.fullName,
                    code: newCode,
                })
            ),
            subject: "Your New Verification Code",
        });

        if (!successMail) {
            return NextResponse.json(
                { message: "Failed to send verification email" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Verification email resent successfully!" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Server error, try again later" },
            { status: 500 }
        );
    }
}

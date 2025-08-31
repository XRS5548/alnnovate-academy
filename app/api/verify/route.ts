// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
    try {
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json(
                { message: "Email and verification code are required" },
                { status: 400 }
            );
        }

        const client = new MongoClient(process.env.MONGO_URL!);
        client.connect()
        const db = client.db("maindatabase");
        const users = db.collection("users");

        const user = await users.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (user.verified) {
            return NextResponse.json(
                { message: "User already verified" },
                { status: 200 }
            );
        }

        if (user.verificationCode !== code) {
            return NextResponse.json(
                { message: "Invalid verification code" },
                { status: 400 }
            );
        }

        // Mark user as verified
        await users.updateOne(
            { email },
            { $set: { verified: true }, $unset: { verificationCode: "" } }
        );

        

        return NextResponse.json(
            { message: "User verified successfully" },
            { status: 200 }
        );

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Failed to verify user" },
            { status: 500 }
        );
    }
}

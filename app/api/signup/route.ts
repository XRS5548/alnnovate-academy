// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { MongoClient } from 'mongodb'
import { generateVerificationCode, sendEmail } from "@/lib/emailservice";
import { VerificationEmail } from "@/components/emails/verificationCodeEmail";
import {render} from '@react-email/render'
export async function POST(req: Request) {
    try {
        const { fullName, email, password, confirmPassword, role, acceptTerms } = await req.json();

        const client = new MongoClient(process.env.MONGO_URL!)
        client.connect()
        const db = client.db('maindatabase')
        const users = db.collection("users")

        // Check if user already exists
        if (await users.findOne({ email })) {
            return NextResponse.json(
                { message: "User is already registered" },
                { status: 409 } // Conflict
            );
        }

        // Password mismatch
        if (password !== confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match" },
                { status: 400 } // Bad Request
            );
        }

        // Terms not accepted
        if (!acceptTerms) {
            return NextResponse.json(
                { message: "Terms and conditions must be accepted" },
                { status: 400 } // Bad Request
            );
        }

        const hash = await bcrypt.hash(password, 10)
        const verificationCode = generateVerificationCode()

        const userData = {
            fullName,
            email,
            password: hash,
            role,
            acceptTerms,
            verified: false, // corrected spelling
            verificationCode
        }

        // Send verification email
        const successmail = await sendEmail({
            to: email,
            template: await render( VerificationEmail({
                firstName: fullName,
                code: verificationCode
            })),
            subject: "Verify Your Code!"
        })
        if(!successmail){
            return NextResponse.json({message:"Server Error"},{status:500})
        }

        const result = await users.insertOne(userData);

        if (result.insertedId) {
            return NextResponse.json(
                { message: "User created successfully" },
                { status: 201 } // Created
            );
        } else {
            return NextResponse.json(
                { message: "Database error" },
                { status: 500 } // Internal Server Error
            );
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Failed to process request" },
            { status: 500 } // Internal Server Error
        );
    }
}

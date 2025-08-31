import { VerificationEmail } from "@/components/emails/verificationCodeEmail";
import { sendEmail } from "@/lib/emailservice";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    await sendEmail({
        to:"myonlineworking5548@gmail.com",
        subject:"Tester Email sending",
        template: await render(VerificationEmail({firstName:"Rohit verma",code:"858585"}))
    })
    return NextResponse.json({ message: "Email send success" })
}
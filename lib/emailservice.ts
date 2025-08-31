import React, { ReactNode } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_EMAIL_API);

export function sendEmail({ to, template, subject }: { to: string; template: ReactNode; subject: string }) {
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject,
        react: template
    });
    return true;
}


export function generateVerificationCode() {
    // Generate a random number between 0 and 999999
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString(); // Return as string to preserve leading zeros if any
}
import nodemailer from 'nodemailer'
export async function sendEmail({ to, template, subject }: { to: string; template: string; subject: string }) {
    const transporter = nodemailer.createTransport({
        service:"gmail",// true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: '"Alnnovate Academy" <alnnovateacademy@gmail.com>',
        to: to,
        subject: subject,
        html: template, // HTML body
    });

    console.log("Message sent:", info.messageId);
    return info.messageId;
}


export function generateVerificationCode() {
    // Generate a random number between 0 and 999999
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString(); // Return as string to preserve leading zeros if any
}
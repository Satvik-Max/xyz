// app/api/send-email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    const { name, email, message, subject,attachments } = await req.json();

    // Create a Nodemailer transporter using Gmail SMTP (you can use other services)
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail app password (not your main password)
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      html: message,
      attachments:attachments
    };

    const resu = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

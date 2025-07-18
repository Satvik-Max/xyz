// app/api/send-email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";

export const GET = async () => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID,
    });

    const payments = await razorpay.payments.all({ count: 100 });
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return NextResponse.json({ Data: payments.items });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

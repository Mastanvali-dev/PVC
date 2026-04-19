import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder',
    });

    const body = await req.json().catch(() => ({}));
    const { amount, currency } = body;

    const options = {
      amount: amount || 33000, // Default to 330 INR in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    }, { status: 200 });

  } catch (error) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json({
      error: "Failed to create Razorpay order. Check your API keys in .env.local"
    }, { status: 500 });
  }
}

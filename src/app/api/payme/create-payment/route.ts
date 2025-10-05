import { NextRequest, NextResponse } from "next/server";
import PaymeClient from "@/lib/payme/payme-client";
import { db } from "@/db";
import { paymeOrders } from "@/db/schema";

const payme = new PaymeClient({
  merchantId: process.env.PAYME_MERCHANT_ID!,
  merchantKey: process.env.PAYME_MERCHANT_KEY!,
  isTestMode: process.env.PAYME_TEST_MODE === "true",
});

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, userId, amount } = body;

    // Validate required fields
    if (!productId || !userId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create order in database
    const now = new Date().toISOString();
    const [order] = await db
      .insert(paymeOrders)
      .values({
        userId,
        productId,
        amount,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Convert amount to tiyin (1 UZS = 100 tiyin)
    const amountInTiyin = Math.round(amount * 100);

    // Generate payment link
    const paymentUrl = payme.generatePaymentLink({
      orderId: order.id.toString(),
      amount: amountInTiyin,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=success`,
    });

    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Create payment error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
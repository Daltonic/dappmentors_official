// /api/stripe/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { ICheckoutItem } from "@/utils/interfaces";

// Environment variables (ensure these are set in your .env file)
const PAYMENT_PROCESSOR_URL =
  process.env.PAYMENT_PROCESSOR_URL || "http://localhost:3000";
const PROCESSOR_KEY = process.env.PROCESSOR_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || "http://localhost:3000";

// POST - Initiate a checkout session for multiple items (products or services)
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log(`POST /api/stripe/checkout - Starting`);

    // Parse request body
    const body = await request.json();
    const {
      items,
    }: {
      items: ICheckoutItem[];
    } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items array is required and must not be empty" },
        { status: 400 },
      );
    }

    // Validate each item
    for (const item of items) {
      if (!item.id || typeof item.quantity !== "number" || item.quantity <= 0) {
        return NextResponse.json(
          { error: "Each item must have a valid id and quantity > 0" },
          { status: 400 },
        );
      }
    }

    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Validate environment variables
    if (!PROCESSOR_KEY || !STRIPE_SECRET_KEY || !WEBHOOK_SECRET) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Prepare line_items for payment processor
    const lineItems = items.map((item) => {
      return {
        name: item.name,
        type: item.type,
        amount: item.price, // Unit price (processor should handle quantity)
        image: item.image || "",
        product_id: item.id, // Or item_id for generality
        quantity: item.quantity,
      };
    });

    console.log(`POST /api/stripe/checkout - Line Items:`, lineItems);

    // Sum up total amount
    const totalAmount = lineItems.reduce((sum, item) => {
      return sum + item.amount * item.quantity;
    }, 0);

    const encodedServiceName = encodeURIComponent(lineItems[0].name);
    const encodedAmount = encodeURIComponent(totalAmount.toString());
    const SUCCESS_URL = `${BACKEND_DOMAIN}/payment-status?status=success&amount=${encodedAmount}&service=${encodedServiceName}`;
    const CANCEL_URL = `${BACKEND_DOMAIN}/payment-status?status=failure&amount=${encodedAmount}&service=${encodedServiceName}`;

    // Prepare payload for payment processor
    const checkoutPayload = {
      line_items: lineItems,
      stripeSecretKey: STRIPE_SECRET_KEY,
      successUrl: SUCCESS_URL,
      cancelUrl: CANCEL_URL,
      backendDomain: BACKEND_DOMAIN,
      webhookSecret: WEBHOOK_SECRET,
      userId: payload.userId,
      email: payload.email,
    };

    // Call the payment processor's /checkout endpoint
    const response = await fetch(`${PAYMENT_PROCESSOR_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-processor-key": PROCESSOR_KEY,
      },
      body: JSON.stringify(checkoutPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Payment processor error:", result);
      return NextResponse.json(
        { error: result.error || "Failed to initiate checkout" },
        { status: response.status },
      );
    }

    // Return the checkout session details to the frontend
    return NextResponse.json({
      checkoutSession: result,
    });
  } catch (error) {
    console.error("POST /api/stripe/checkout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

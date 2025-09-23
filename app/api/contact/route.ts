import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters long")
    .max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(2000),
  serviceType: z.string().optional(),
  captcha: z.string().min(1),
  captchaExpected: z.string().min(1),
  timestamp: z.number(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.reduce(
        (acc, err) => {
          acc[err.path[0] as string] = err.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    const {
      name,
      email,
      subject,
      message,
      serviceType,
      captcha,
      captchaExpected,
      timestamp,
    } = validationResult.data;

    // Verify captcha
    if (captcha !== captchaExpected) {
      return NextResponse.json(
        {
          error: "Invalid captcha",
          details: {
            captcha: "Please solve the math problem correctly",
          },
        },
        { status: 400 },
      );
    }

    // Check timestamp (within 5 minutes)
    const now = Date.now();
    if (timestamp < now - 5 * 60 * 1000) {
      return NextResponse.json(
        {
          error: "Request expired",
          details: {
            general: "Please refresh the page and try again.",
          },
        },
        { status: 400 },
      );
    }

    // Send contact email using the dedicated function
    const emailSent = await sendContactEmail(
      name,
      email,
      subject,
      message,
      serviceType,
    );

    if (!emailSent) {
      console.error("Failed to send contact email");
      return NextResponse.json(
        {
          error: "Failed to send message. Please try again later.",
        },
        { status: 500 },
      );
    }

    // Log for development
    if (process.env.NODE_ENV === "development") {
      console.log(`Contact email sent for: ${email}`);
    }

    return NextResponse.json(
      {
        message: "Thank you for your message! We'll get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

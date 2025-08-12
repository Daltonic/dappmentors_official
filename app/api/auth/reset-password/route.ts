import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { details: "Email is required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ details: "User not found" }, { status: 404 });
    }

    // Generate a 6-digit reset PIN
    const resetPin = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration to 10 minutes from now
    const resetPinExpires = new Date(Date.now() + 5 * 60 * 1000);

    // Update user with reset PIN and expiration
    user.resetPin = resetPin;
    user.resetPinExpires = resetPinExpires;
    await user.save();

    // Log the PIN to the console (for testing purposes)
    console.log(
      `Password reset PIN for ${email}: ${resetPin} (expires at ${resetPinExpires.toISOString()})`,
    );

    return NextResponse.json(
      { message: "Reset PIN generated. Check console for PIN." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { details: "Internal server error" },
      { status: 500 },
    );
  }
}

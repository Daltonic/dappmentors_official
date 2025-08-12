import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, resetPin, newPassword, confirmPassword } = await req.json();

    // Validate all required fields
    if (!email || !resetPin || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { details: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { details: "Passwords do not match" },
        { status: 400 },
      );
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ details: "User not found" }, { status: 404 });
    }

    // Check if reset PIN exists
    if (!user.resetPin || !user.resetPinExpires) {
      return NextResponse.json(
        { details: "No reset PIN found for this user" },
        { status: 400 },
      );
    }

    // Check if reset PIN has expired
    if (user.resetPinExpires < new Date()) {
      return NextResponse.json(
        { details: "Reset PIN expired, try again" },
        { status: 400 },
      );
    }

    // Check if provided PIN matches
    if (user.resetPin !== resetPin) {
      return NextResponse.json(
        { details: "Enter the correct PIN" },
        { status: 400 },
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset PIN
    user.password = hashedPassword;
    user.resetPin = undefined;
    user.resetPinExpires = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password successfully reset" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Password recovery error:", error);
    return NextResponse.json(
      { details: "Internal server error" },
      { status: 500 },
    );
  }
}

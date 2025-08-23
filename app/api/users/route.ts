import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";

// Define types for your data (example: User model)
interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  createdAt?: Date;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");
    console.log(request);

    const users = await collection.find({}).limit(10).toArray(); // Example query: fetch up to 10 users

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const body: User = await request.json(); // Parse incoming JSON
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { insertedId: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

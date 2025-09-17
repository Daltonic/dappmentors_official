import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Verify authentication
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { type, id } = body;

    // Validate request body
    if (!type || !id || !["product", "service"].includes(type)) {
      return NextResponse.json(
        {
          error:
            "Invalid request: type and id required, type must be 'product' or 'service'",
        },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const usersCollection: Collection = db.collection("users");

    // Update user's purchased items
    const updateField =
      type === "product" ? "purchasedProducts" : "purchasedServices";
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(payload.userId) },
      { $addToSet: { [updateField]: id } }, // Use $addToSet to avoid duplicates
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to update user or purchase already exists" },
        { status: 400 },
      );
    }

    // Update item counters and user counters
    if (type === "product") {
      const productsCollection: Collection = db.collection("products");
      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });

      if (product) {
        await productsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { enrollments: 1, studentsEnrolled: 1 } },
        );

        if (product.type === "Course" || product.type === "Bootcamp") {
          await usersCollection.updateOne(
            { _id: new ObjectId(payload.userId) },
            { $inc: { coursesEnrolled: 1 } },
          );
        }
      }
    } else if (type === "service") {
      const servicesCollection: Collection = db.collection("services");
      await servicesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { clients: 1 } },
      );
    }

    return NextResponse.json(
      { message: "Purchase saved successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

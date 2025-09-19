// /api/activities/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Activity } from "@/utils/interfaces";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Verify authentication and admin role
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload || payload.role !== "admin") {
      // Enforce admin
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const db = await connectToDatabase();
    const activitiesCollection: Collection<Activity> =
      db.collection("activities");

    // Pagination (optional)
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = parseInt(url.searchParams.get("skip") || "0");

    // Fetch recent activities
    const activities = await activitiesCollection
      .find({}, { projection: { metadata: { userId: 0 } } }) // Exclude sensitive metadata
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Transform for frontend (map _id to id, format timestamp as ISO string)
    const transformedActivities: Activity[] = activities.map(
      (doc: Activity & { _id: ObjectId }) => {
        const { _id, timestamp, ...rest } = doc;
        return {
          ...rest,
          id: _id.toString(),
          timestamp: new Date(timestamp), // Convert ISO string back to Date object
        };
      },
    );

    const total = await activitiesCollection.countDocuments();

    return NextResponse.json({
      activities: transformedActivities,
      pagination: {
        skip,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/activities error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

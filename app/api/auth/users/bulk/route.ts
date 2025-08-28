// /api/auth/users/bulk/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { User } from "@/utils/interfaces";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if user has admin privileges (uncomment when ready)
    // if (payload.role !== 'admin' || payload.status !== 'active') {
    //   return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    // }

    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const body = await request.json();
    const { action, userIds, newRole, newStatus } = body;

    // Validate required fields
    if (!action || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: action and userIds" },
        { status: 400 },
      );
    }

    // Convert string IDs to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = userIds.map((id: string) => new ObjectId(id));
    } catch (error) {
      console.error("PATCH /api/auth/users/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid user IDs provided" },
        { status: 400 },
      );
    }

    let updateResult;
    const now = new Date();

    switch (action) {
      case "bulk-role-change":
        if (!newRole) {
          return NextResponse.json(
            { error: "newRole is required for role change" },
            { status: 400 },
          );
        }

        // Validate role
        const validRoles = ["admin", "instructor", "student"];
        if (!validRoles.includes(newRole)) {
          return NextResponse.json(
            { error: "Invalid role provided" },
            { status: 400 },
          );
        }

        // Prevent users from changing their own role to avoid lockout
        const currentUserId = payload.userId;
        if (userIds.includes(currentUserId)) {
          return NextResponse.json(
            { error: "You cannot change your own role" },
            { status: 403 },
          );
        }

        updateResult = await collection.updateMany(
          { _id: { $in: objectIds } },
          {
            $set: {
              role: newRole,
              updatedAt: now,
            },
          },
        );
        break;

      case "bulk-status-change":
        if (!newStatus) {
          return NextResponse.json(
            { error: "newStatus is required for status change" },
            { status: 400 },
          );
        }

        // Validate status
        const validStatuses = ["active", "inactive", "banned", "pending"];
        if (!validStatuses.includes(newStatus)) {
          return NextResponse.json(
            { error: "Invalid status provided" },
            { status: 400 },
          );
        }

        // Prevent users from changing their own status to avoid lockout
        const currentUserIdForStatus = payload.userId;
        if (userIds.includes(currentUserIdForStatus)) {
          return NextResponse.json(
            { error: "You cannot change your own status" },
            { status: 403 },
          );
        }

        updateResult = await collection.updateMany(
          { _id: { $in: objectIds } },
          {
            $set: {
              status: newStatus,
              updatedAt: now,
            },
          },
        );
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action provided" },
          { status: 400 },
        );
    }

    // Check if any documents were updated
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: "No users found with the provided IDs" },
        { status: 404 },
      );
    }

    // Fetch updated users to return current state (excluding sensitive data)
    const updatedUsers = await collection
      .find(
        { _id: { $in: objectIds } },
        {
          projection: {
            password: 0,
            emailVerificationToken: 0,
            passwordResetToken: 0,
            passwordResetExpires: 0,
          },
        },
      )
      .toArray();

    // Map _id to id for frontend consistency
    const mappedUsers = updatedUsers.map((user) => ({
      ...user,
      id: user._id.toString(),
      _id: undefined,
    }));

    const successMessage =
      action === "bulk-role-change"
        ? `Successfully updated role for ${updateResult.modifiedCount} users to ${newRole}`
        : `Successfully updated status for ${updateResult.modifiedCount} users to ${newStatus}`;

    return NextResponse.json(
      {
        message: successMessage,
        modifiedCount: updateResult.modifiedCount,
        matchedCount: updateResult.matchedCount,
        users: mappedUsers,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/auth/users/bulk error:", error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return NextResponse.json(
          { error: "Duplicate key error occurred" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// GET method for getting bulk user information (optional)
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const url = new URL(request.url);
    const userIds = url.searchParams.get("userIds");

    if (!userIds) {
      return NextResponse.json(
        { error: "userIds parameter is required" },
        { status: 400 },
      );
    }

    const userIdArray = userIds.split(",");

    // Convert to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = userIdArray.map((id: string) => new ObjectId(id.trim()));
    } catch (error) {
      console.error("GET /api/auth/users/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid user IDs provided" },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const users = await collection
      .find(
        { _id: { $in: objectIds } },
        {
          projection: {
            password: 0,
            emailVerificationToken: 0,
            passwordResetToken: 0,
            passwordResetExpires: 0,
          },
        },
      )
      .toArray();

    // Map _id to id
    const mappedUsers = users.map((user) => ({
      ...user,
      id: user._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json({ users: mappedUsers }, { status: 200 });
  } catch (error) {
    console.error("GET /api/auth/users/bulk error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

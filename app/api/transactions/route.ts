// /api/transactions/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Collection, Filter } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/utils/interfaces";

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

    if (payload.role !== "admin" || payload.status !== "active") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const db = await connectToDatabase();
    const collection: Collection<Transaction> = db.collection("transactions");

    // Get query parameters for pagination and filtering
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Build filter object (can add filters like type, status if needed in future)
    const filter: Filter<Transaction> = {};

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch transactions
    const transactions = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Map _id to id
    const mappedTransactions = transactions.map((tx) => ({
      ...tx,
      id: tx._id.toString(),
      _id: undefined,
    }));

    // Get total count for pagination
    const total = await collection.countDocuments(filter);

    return NextResponse.json(
      {
        transactions: mappedTransactions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/transactions error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

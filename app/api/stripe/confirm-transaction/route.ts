// /api/stripe/confirm-transaction/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ICheckoutItem } from "@/utils/interfaces";
import { logActivity } from "@/heplers/users";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract processorKey from Authorization header
    const authHeader = request.headers.get("authorization");
    const processorKey = authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : null;

    // Verify processor secret
    if (!processorKey || processorKey !== process.env.PROCESSOR_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { email, userId, tx, type, id, line_items } = body;

    // Validate required fields
    if (!email || !userId || !tx || !type) {
      return NextResponse.json(
        { error: "Invalid request: email, userId, tx, and type are required" },
        { status: 400 },
      );
    }

    // For one-time payments, validate line_items
    if (
      type !== "subscription" &&
      (!line_items || !Array.isArray(line_items) || line_items.length === 0)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request: line_items are required for non-subscription transactions",
        },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const transactionsCollection: Collection = db.collection("transactions");
    const usersCollection: Collection = db.collection("users");
    const productsCollection: Collection = db.collection("products");
    const servicesCollection: Collection = db.collection("services");

    // Normalize line_items so each has `price` (for non-subscription transactions)
    let normalizedLineItems: ICheckoutItem[] = [];
    if (type !== "subscription") {
      normalizedLineItems = line_items.map((item: ICheckoutItem) => ({
        id: item.id, // keep one consistent field
        name: item.name,
        type: item.type,
        price: Number(item.amount || 0), // Use item.amount instead of item.price
        quantity: Number(item.quantity || 1),
        image: item.image || "",
      }));
    }

    // Calculate total amount consistently (for non-subscription transactions)
    const totalAmount =
      type !== "subscription"
        ? normalizedLineItems.reduce(
            (sum: number, item: ICheckoutItem) =>
              sum + item.price * item.quantity,
            0,
          )
        : 0; // Subscriptions may not have a totalAmount in this context

    // Create transaction record
    const transaction = {
      email,
      userId,
      transactionId: tx,
      type: type || "checkout", // 'checkout', 'subscription', etc.
      ...(type !== "subscription" && { lineItems: normalizedLineItems }),
      ...(type !== "subscription" && { totalAmount }),
      ...(type === "subscription" && { subscriptionId: id }),
      createdAt: new Date(),
      status: "completed",
    };

    // Insert transaction into transactions collection
    const transactionResult =
      await transactionsCollection.insertOne(transaction);

    if (!transactionResult.insertedId) {
      return NextResponse.json(
        { error: "Failed to save transaction" },
        { status: 500 },
      );
    }

    // Find user by email
    const user = await usersCollection.findOne({ email }); // Find by email or userId

    if (user) {
      // Process each line item for non-subscription transactions
      if (type !== "subscription") {
        for (const item of normalizedLineItems) {
          if (!item.id || item.id === "0") continue;

          if (item.type === "product") {
            // Add to user's purchased products
            await usersCollection.updateOne(
              { email },
              { $addToSet: { purchasedProducts: item.id } },
            );

            // Update product counters
            const product = await productsCollection.findOne({
              _id: new ObjectId(item.id),
            });

            if (product) {
              await productsCollection.updateOne(
                { _id: new ObjectId(item.id) },
                {
                  $inc: {
                    enrollments: item.quantity,
                    studentsEnrolled: item.quantity,
                  },
                },
              );

              // If it's a course or bootcamp, update user's course count
              if (product.type === "Course" || product.type === "Bootcamp") {
                await usersCollection.updateOne(
                  { email },
                  { $inc: { coursesEnrolled: item.quantity } },
                );
              }
            }
          } else if (item.type === "service") {
            // Add to user's purchased services
            await usersCollection.updateOne(
              { email },
              { $addToSet: { purchasedServices: item.id } },
            );

            // Update service counters
            await servicesCollection.updateOne(
              { _id: new ObjectId(item.id) },
              { $inc: { clients: item.quantity } },
            );
          }
        }
      }

      // Handle subscription type
      if (type === "subscription") {
        await usersCollection.updateOne(
          { email },
          {
            $set: {
              subscriptionActive: true,
              subscriptionTransactionId: tx,
              subscriptionStartDate: new Date(),
            },
          },
        );
      }
    } else {
      console.warn(`User not found for email: ${email}`);
      // Optionally create a new user or handle this case
    }

    // Log activity for product creation
    await logActivity(
      db,
      "payment_received",
      "Payment Received",
      `${normalizedLineItems[0].name} ${
        normalizedLineItems.length > 1
          ? " and " + normalizedLineItems.length + " other items"
          : type
      } was purchased by ${email}`,
      {
        userId,
        itemType: type,
      },
    );

    console.log("Transaction saved successfully:", {
      transactionId: tx,
      email,
      userId,
      type,
      ...(type !== "subscription" && {
        lineItemsCount: normalizedLineItems.length,
        totalAmount,
        items: normalizedLineItems.map((item: ICheckoutItem) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          quantity: item.quantity,
        })),
      }),
      ...(type === "subscription" && { subscriptionId: id }),
    });

    return NextResponse.json(
      {
        message: "Transaction saved successfully",
        transactionId: transactionResult.insertedId,
        ...(type !== "subscription" && {
          processedItems: normalizedLineItems.length,
          totalAmount,
        }),
        ...(type === "subscription" && { subscriptionId: id }),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/stripe/confirm-transaction error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

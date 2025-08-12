import { NextResponse } from "next/server";
import Transaction from "@/models/Transaction";
import { connectDB } from "@/lib/db";

// Handle POST request to create a transaction
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      userId,
      transaction,
      userEmail,
      amount,
      transactionType,
      transactionPurpose,
    } = body;

    if (
      !userId ||
      !transaction ||
      !userEmail ||
      !amount ||
      !transactionType ||
      !transactionPurpose
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const newTransaction = new Transaction({
      userId,
      transaction,
      userEmail,
      amount,
      transactionType,
      transactionPurpose,
    });

    await newTransaction.save();

    return NextResponse.json(
      { message: "Transaction created", data: newTransaction },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing transaction", details: error },
      { status: 500 },
    );
  }
}

// Handle GET request to fetch all transactions
export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find();
    return NextResponse.json({ data: transactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching transactions", details: error },
      { status: 500 },
    );
  }
}

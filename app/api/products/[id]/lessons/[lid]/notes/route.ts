// /api/products/[id]/lessons/[lid]/notes/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Note } from "@/utils/interfaces";

interface NoteDocument extends Omit<Note, "id" | "createdAt"> {
  _id: ObjectId;
  productId: string;
  lessonId: string;
  userId: string;
  createdAt: Date;
}

// GET - Fetch notes for a specific lesson
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lid: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId, lid: lessonId } = resolvedParams;

    console.log(
      `GET /api/products/${productId}/lessons/${lessonId}/notes - Starting`,
    );

    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const notesCollection: Collection<NoteDocument> =
      db.collection("lesson_notes");

    // Fetch notes for this user, product, and lesson
    const notes = await notesCollection
      .find({
        productId,
        lessonId,
        userId: payload.userId,
      })
      .sort({ timestamp: 1 })
      .toArray();

    const formattedNotes = notes.map((note) => ({
      id: note._id.toString(),
      timestamp: note.timestamp,
      content: note.content,
      createdAt: note.createdAt,
    }));

    return NextResponse.json({ notes: formattedNotes });
  } catch (error) {
    console.error("GET /api/products/[id]/lessons/[lid]/notes error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST - Add a new note
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lid: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId, lid: lessonId } = resolvedParams;

    const body = await request.json();
    const { timestamp, content } = body;

    if (typeof timestamp !== "number" || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid note data" }, { status: 400 });
    }

    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const notesCollection: Collection<NoteDocument> =
      db.collection("lesson_notes");

    const newNote: Omit<NoteDocument, "_id"> = {
      productId,
      lessonId,
      userId: payload.userId,
      timestamp,
      content,
      createdAt: new Date(),
    };

    const result = await notesCollection.insertOne(newNote as NoteDocument);

    return NextResponse.json({
      id: result.insertedId.toString(),
      timestamp,
      content,
      createdAt: newNote.createdAt,
    });
  } catch (error) {
    console.error("POST /api/products/[id]/lessons/[lid]/notes error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// /api/products/[id]/lessons/[lid]/notes/[noteId]/route.ts

// DELETE - Delete a specific note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lid: string; noteId: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId, lid: lessonId, noteId } = resolvedParams;

    if (!ObjectId.isValid(noteId)) {
      return NextResponse.json({ error: "Invalid note ID" }, { status: 400 });
    }

    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const notesCollection: Collection<NoteDocument> =
      db.collection("lesson_notes");

    // Delete the note (only if it belongs to the authenticated user)
    const result = await notesCollection.deleteOne({
      _id: new ObjectId(noteId),
      productId,
      lessonId,
      userId: payload.userId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(
      "DELETE /api/products/[id]/lessons/[lid]/notes/[noteId] error:",
      error,
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import mongodbService from "@/services/mongodb.service";
import Contact, { IContact } from "@/models/Contact";

export async function GET() {
  await mongodbService.connect();
  const contacts = await mongodbService.find<IContact>(Contact, {});

  return NextResponse.json({
    data: contacts,
    count: contacts.length,
    message: "Contacts fetched successfully",
    status: 200,
  });
}

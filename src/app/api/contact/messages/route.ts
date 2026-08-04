import { NextRequest, NextResponse } from "next/server";
import { getContactCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const collection = await getContactCollection();
    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formattedMessages = messages.map((m) => ({
      ...m,
      _id: m._id.toString(),
    }));

    return NextResponse.json({ success: true, data: formattedMessages });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Message ID and status are required" },
        { status: 400 }
      );
    }

    const collection = await getContactCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Message status updated" });
  } catch (error) {
    console.error("Error updating message status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Message ID parameter required" },
        { status: 400 }
      );
    }

    const collection = await getContactCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete message" },
      { status: 500 }
    );
  }
}

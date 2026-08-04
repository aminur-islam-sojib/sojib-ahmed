import { NextRequest, NextResponse } from "next/server";
import { getProjectsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const collection = await getProjectsCollection();

    let query: any = {};
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { id: isNaN(Number(id)) ? id : Number(id) }] };
    } else {
      query = { id: isNaN(Number(id)) ? id : Number(id) };
    }

    const { name, description, image, liveUrl, category, techStack, githubClient, githubServer } = body;

    const updateData: any = {
      ...(name && { name }),
      ...(description && { description }),
      ...(image && { image }),
      ...(liveUrl !== undefined && { liveUrl }),
      ...(category && { category }),
      ...(techStack && {
        techStack: Array.isArray(techStack)
          ? techStack
          : typeof techStack === "string"
          ? techStack.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      }),
      ...(githubClient !== undefined && { githubClient }),
      ...(githubServer !== undefined && { githubServer }),
      updatedAt: new Date(),
    };

    const result = await collection.updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );

    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collection = await getProjectsCollection();

    let query: any = {};
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { id: isNaN(Number(id)) ? id : Number(id) }] };
    } else {
      query = { id: isNaN(Number(id)) ? id : Number(id) };
    }

    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}

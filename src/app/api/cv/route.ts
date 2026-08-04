import { NextRequest, NextResponse } from "next/server";
import { getCvCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const collection = await getCvCollection();
    let settings = await collection.findOne({ key: "active_cv" });

    if (!settings) {
      // Seed default CV settings
      const defaultSettings = {
        key: "active_cv",
        cvUrl: "/Sojib_Ahmed_Resume.pdf",
        title: "Sojib Ahmed - Full Stack Web Developer Resume",
        description: "Official Curriculum Vitae of Sojib Ahmed, Full Stack Web Developer.",
        updatedAt: new Date(),
      };
      await collection.insertOne(defaultSettings);
      settings = defaultSettings as any;

    }

    return NextResponse.json({
      success: true,
      data: {
        cvUrl: settings?.cvUrl || "/Sojib_Ahmed_Resume.pdf",
        title: settings?.title || "Sojib Ahmed - Full Stack Web Developer Resume",
        description: settings?.description || "Official Curriculum Vitae of Sojib Ahmed, Full Stack Web Developer.",
        updatedAt: settings?.updatedAt || new Date(),
      },
    });

  } catch (error) {
    console.error("Error fetching CV settings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch CV settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cvUrl, title, description } = body;

    if (!cvUrl) {
      return NextResponse.json(
        { success: false, message: "CV URL is required" },
        { status: 400 }
      );
    }

    const collection = await getCvCollection();
    const updatedData = {
      key: "active_cv",
      cvUrl,
      title: title || "Sojib Ahmed - Full Stack Web Developer Resume",
      description: description || "Official Curriculum Vitae of Sojib Ahmed, Full Stack Web Developer.",
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { key: "active_cv" },
      { $set: updatedData },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "CV settings updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating CV settings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update CV settings" },
      { status: 500 }
    );
  }
}

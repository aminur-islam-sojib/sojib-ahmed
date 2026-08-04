import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.IMGBB_API_KEY || "d72c7d0aead4ab71252325992edccedd";
    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "No image file provided" },
        { status: 400 }
      );
    }

    // Forward image to ImgBB API
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", imageFile as Blob);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbFormData,
    });

    const result = await response.json();

    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        url: result.data.url,
        display_url: result.data.display_url || result.data.url,
        delete_url: result.data.delete_url,
      });
    } else {
      console.error("ImgBB upload error response:", result);
      return NextResponse.json(
        {
          success: false,
          message: result.error?.message || "Failed to upload image to ImgBB",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Image upload exception:", error);
    return NextResponse.json(
      { success: false, message: "Server error during image upload" },
      { status: 500 }
    );
  }
}

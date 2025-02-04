import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get("publicId");

  if (!publicId) {
    return NextResponse.json({ error: "publicId is required" }, { status: 400 });
  }

  const cloudName = "doy0la086";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
  const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?public_ids=${publicId}&type=upload`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete image", details: error.message },
      { status: 500 }
    );
  }
}

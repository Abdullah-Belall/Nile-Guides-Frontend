import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const access_token = (await cookies()).get("access_token")?.value;
  if (!access_token) NextResponse.json({ error: { message: "Unauthorized." } }, { status: 404 });
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: { message: "No file uploaded." } }, { status: 400 });
  }
  try {
    const backendResponse = await fetch(`https://api.cloudinary.com/v1_1/doy0la086/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      return NextResponse.json({ error: data }, { status: backendResponse.status });
    }
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

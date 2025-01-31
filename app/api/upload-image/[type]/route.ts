import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { type: "save" | "temporary-save" } }
) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const access_token = (await cookies()).get("access_token")?.value;
  if (!access_token) NextResponse.json({ error: { message: "Unauthorized." } }, { status: 404 });
  const formData = await req.formData();
  const file = formData.get("image");
  if (!file) {
    return NextResponse.json({ error: { message: "No file uploaded." } }, { status: 400 });
  }
  const unWrapedParams = await params;
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pushImage/${unWrapedParams.type}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      return NextResponse.json({ error: data }, { status: backendResponse.status });
    }
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: error?.message || "Internal Server Error" } },
      { status: 500 }
    );
  }
}

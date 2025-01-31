import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { role: "clients" | "workers" } }) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const access_token = (await cookies()).get("access_token")?.value;
  if (!access_token) NextResponse.json({ error: { message: "Unauthorized." } }, { status: 404 });
  const unWrappedParams = await params;
  const url = new URL(req.url);
  const params_ = url.searchParams;
  try {
    const backendURL = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/${unWrappedParams.role}-tickets`
    );
    backendURL.search = params_.toString();
    const backendResponse = await fetch(backendURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
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

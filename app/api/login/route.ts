import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
    const body = await req.json();
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await backendResponse.json();
    const backendCookies = backendResponse.headers.get("set-cookie");
    const response = NextResponse.json(data, { status: backendResponse.status });
    if (!backendResponse.ok)
      return NextResponse.json({ error: data }, { status: backendResponse.status });
    if (backendCookies) response.headers.append("Set-Cookie", backendCookies);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: error?.message || "Internal Server Error" } },
      { status: 500 }
    );
  }
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const access_token = (await cookies()).get("access_token")?.value;
  if (!access_token)
    return NextResponse.json({ error: { message: "Unauthorized." } }, { status: 401 });
  try {
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
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

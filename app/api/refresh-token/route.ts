import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const cookiesStore = await cookies();
  const refresh_token = cookiesStore.get("refresh_token")?.value;
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/new-access-token`,
      {
        method: "GET",
        headers: {
          cookie: `refresh_token=${refresh_token};`,
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

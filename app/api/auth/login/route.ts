import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!backendRes.ok) {
    return NextResponse.json({ detail: "Invalid credentials" }, { status: 401 });
  }

  const { access_token } = await backendRes.json();
  const isProduction = process.env.NODE_ENV === "production";
  const maxAge = 60 * 60 * 24 * 7; // 7 days

  const response = NextResponse.json({ status: "ok" });
  response.cookies.set("token", access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    maxAge,
    path: "/",
  });
  return response;
}

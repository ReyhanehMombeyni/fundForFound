import { NextRequest, NextResponse } from "next/server";
import { env } from "../../../../../lib/env";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const translatedMessage = "Invalid identifier or password";
      return NextResponse.json(
        { message: translatedMessage, code: "INVALID_CREDENTIALS" },
        { status: 400 }
      );
    }

    const data = await res.json();
    const { jwt, user } = data;

    const response = NextResponse.json({ user });

    response.cookies.set({
      name: "token",
      value: jwt,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}

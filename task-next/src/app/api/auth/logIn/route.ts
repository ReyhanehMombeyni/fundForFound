import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { env } from "../../../../../lib/env";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await axios.post(`${env.NEXT_PUBLIC_API_URL}/api/auth/local`, body);
    const { jwt, user } = res.data;

    const response = NextResponse.json({ user });

    response.cookies.set({
      name: "token",
      value: jwt,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, 
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}

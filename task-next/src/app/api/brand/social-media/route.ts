import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "../../../../../lib/env";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ status: 400, message: "not token" });
  }

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/social-medias/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resJson = await res.json();
    const socialMedia = resJson.data;
    return NextResponse.json({ socialMedia });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ status: 403, message: "error in fetch" });
  }
}

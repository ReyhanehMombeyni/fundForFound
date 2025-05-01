import { cookies } from "next/headers";
import { env } from "../../../../lib/env";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ isLoggedIn: false, user: null });
    }

    const data = await res.json(); 
    const { id, username, email } = data;
    return NextResponse.json({ isLoggedInInfo: true, userInfo: { id, username, email } });

  } catch (error) {
    console.error("خطا در گرفتن اطلاعات کاربر:", error);
    return NextResponse.json({ isLoggedIn: false, user: null });
  }
}

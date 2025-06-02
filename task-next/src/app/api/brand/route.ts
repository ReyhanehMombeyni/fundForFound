import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "../../../../lib/env";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
    
  if (!token) {    
    return NextResponse.json({ status: 400, message: "not token" });
  }

  try {
    const resCountry = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/countries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resCountryJson= await resCountry.json();
    const countries = resCountryJson.data;    

    const resCategory = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resCategoriesJson = await resCategory.json();
      const categories= resCategoriesJson.data;

      const resSubCategory = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/subcategories?populate=category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resSubCategoryJson = await resSubCategory.json();
      const subcategories= resSubCategoryJson.data;

      const resTag = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/tags`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resTagJson = await resTag.json();
      const tags= resTagJson.data;
      
      return NextResponse.json({ dataBrandPost: { countries, categories, subcategories, tags } });
  } catch (error) {
    console.error(error);
    
    return NextResponse.json({ status: 403, message:"error in fetch" });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ status: 403, message: "token not found." });
  }

  const body = await req.json();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({data: body}),
    });

    if (!res.ok) {
      return NextResponse.json(
        { status: 400, message: "respose not ok." }
      );
    }

    const data = await res.json();
    return NextResponse.json({ message: 'Tag created successfully', tag: data.data });
    
  } catch(err) {
    return NextResponse.json(
      { status: 400, message: `failed fetch ${err}` }
    );
  }
}

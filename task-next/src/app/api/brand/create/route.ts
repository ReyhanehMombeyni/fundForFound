import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "../../../../../lib/env";
import { Tag } from "@/types";
import { convertEditorJSToStrapiBlocks } from "../../../../../lib";
// import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ status: 403, message: "token not found." });
  }
  // const documentId = jwt.verify(token, env.JWT_SECRET) as { documentId: string };
  
  const bodyRequest = await req.json();
  console.log(bodyRequest);
  const {firstStep, editorData, socialData}= bodyRequest;
  const { name, country, category, subCategory, selectedTags } = firstStep;
  const selectedTagsDocId: string[] = selectedTags?.map((tag: Tag) => tag.documentId);
  const confirmationToken= "jhsbxjhbsajxbasjcbasjhbc";
  const isconfirmed= false;

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/brand-orgs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          name,
          about: editorData,
          country: { connect: [country] },
          category: { connect: [category] },
          subcategory: { connect: [subCategory] },
          tags: {
            connect: selectedTagsDocId?.map((documentId) => ({ documentId })),
          },
          brand_socials: {
            create: socialData.map((item) => ({
              customUrl: item.customUrl,
              social_media: item.documentId, 
            })),
          },
          // confirmationToken,
          // isconfirmed,
          // user: { connect: [documentId] },
        },
      }),
    });
          
    console.log(res);
    
      if (!res.ok) {
        return NextResponse.json({ status: 400, message: "respose not ok." });
      }
  
      const data = await res.json();
      return NextResponse.json({
        message: "SocialBrand created successfully",
        brand: data,
        status: 200
      });
    } catch (err) {
      return NextResponse.json({ status: 400, message: `failed fetch ${err}` });
    }
}

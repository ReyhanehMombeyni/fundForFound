import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("image") as File;

  if (!file) return NextResponse.json({ success: 0, message: "No file uploaded" });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filepath, buffer);

  return NextResponse.json({
    success: 1,
    file: {
      url: `/uploads/${filename}`,
    },
  });
}

'use client'
import dynamic from "next/dynamic";

const EditorBlock = dynamic(() => import("../components/EditorBlock"), {
  ssr: false,
});

export default function EditorPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">ویرایشگر Rich Text</h1>
      <EditorBlock />
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import axios from "axios";
import { EditorJsData } from "@/types/editor";

interface EditorBlockProps {
  initialData?: EditorJsData;
  postId?: number;
}

export default function EditorBlock({ initialData, postId }: EditorBlockProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editorRef.current) return; 

    const editor = new EditorJS({
      holder: "editorjs", 
      placeholder: "Start writing your content here...",
      tools: {
        header: Header,
        list: List,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "/api/upload",
              byUrl: "/api/fetchUrl",
            },
          },
        },
      },
      data: initialData || { time: Date.now(), blocks: [] },
      onReady: () => {
        console.log("Editor.js is ready!");
      },
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initialData]);

  const handleSave = async () => {
    if (!editorRef.current) return;
    setLoading(true);
    try {
      const output = await editorRef.current.save();
      const payload = {
        data: {
          content: output,
        },
      };

      if (postId) {
        await axios.put(`http://localhost:1337/api/posts/${postId}`, payload);
        alert("ویرایش شد!");
      } else {
        await axios.post("http://localhost:1337/api/posts", payload);
        alert("پست جدید ذخیره شد!");
      }
    } catch (err) {
      console.error("خطا در ذخیره:", err);
      alert("ذخیره با مشکل مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div id="editorjs" className="border p-4 bg-white rounded text-blue-950" />
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-1 rounded hover:bg-gray-700 ml-3"
      >
        {loading ? "Saving" : "Save"}
      </button>
    </div>
  );
}

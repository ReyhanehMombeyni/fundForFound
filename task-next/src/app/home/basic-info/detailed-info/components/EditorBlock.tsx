"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { usePostForm } from "@/app/home/context/context";

export default function EditorBlock() {
  const editorRef = useRef<EditorJS | null>(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { dispatch } = usePostForm();

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
              byFile: "/api/brand/editor-upload",
              byUrl: "/api/brand/editor-upload",
            },
            field: "image",
            types: "image/*",
          },
        },
      },
      data: { time: Date.now(), blocks: [] },
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
  }, []);

  const handleSave = async () => {
    if (!editorRef.current) return;
    setLoadingSave(true);
    try {
      const output: OutputData = await editorRef.current.save();
      dispatch({ type: "SET_EDITOR_DATA", payload: output });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleEdit = async () => {
    if (!editorRef.current) return;
    setLoadingEdit(true);
    try {
      const output: OutputData = await editorRef.current.save();
      dispatch({ type: "SET_EDITOR_DATA", payload: output });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <div className="space-y-5">
      <div
        id="editorjs"
        className="border-none shadow mt-10 p-4 pl-15 bg-white rounded text-blue-950"
      />
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleEdit}
          disabled={loadingEdit}
          className="bg-blue-600 text-white px-7 py-2 rounded hover:bg-gray-700"
        >
          {loadingEdit ? "Editing" : "Edit"}
        </button>
        <button
          onClick={handleSave}
          disabled={loadingSave}
          className="bg-gray-700 text-white px-7 py-2 rounded hover:bg-blue-600"
        >
          {loadingSave ? "Saving" : "Save"}
        </button>
      </div>
    </div>
  );
}

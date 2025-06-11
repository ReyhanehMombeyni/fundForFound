"use client";

import { useState } from "react";
import { usePostForm } from "@/app/home/context/context";

export default function EditorBlock() {
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [valueEditor, setValueEditor] = useState<string>("");
  const { dispatch } = usePostForm();

  const handleSave = async () => {
    setLoadingSave(true);
    try {
      dispatch({ type: "SET_EDITOR_DATA", payload: valueEditor });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        type="text"
        className="input bg-white w-full mt-5 shadow-lg py-5"
        value={valueEditor}
        onChange={(e) => setValueEditor(e.target.value)}
      />
      <button
        onClick={handleSave}
        disabled={loadingSave}
        className="bg-gray-700 text-white px-7 py-2 rounded hover:bg-blue-600"
      >
        {loadingSave ? "Saving" : "Save"}
      </button>
    </div>
  );
}

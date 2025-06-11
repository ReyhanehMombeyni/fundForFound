"use client";

import { usePostForm } from "@/app/home/context/context";
import { socialMedia, socialSelected } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";

const schema = yup.object({
  socialSelected: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        documentId: yup.string().required(),
        baseUrl: yup.string().url().required(),
        customUrl: yup.string().required(),
      })
    )
    .min(3),
});

export default function SocialLinkSelector() {
  const [errors, setErrors] = useState<string | null>(null);
  const [social, setSocial] = useState<socialMedia[] | null>(null);
  const [socialSelected, setSocialSelected] = useState<socialSelected[]>([
    { name: "", documentId: "", baseUrl: "", customUrl:"" },
  ]);
  const { state, dispatch } = usePostForm();
  const router = useRouter();

  useEffect(() => {
    const getSocialMedia = async () => {
      const res = await fetch("/api/brand/social-media", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setSocial(data.socialMedia);
    };
    getSocialMedia();
  }, []);

  const handlePlatformChange = (index: number, newPlatform: string) => {
    console.log(index, newPlatform);

    const isAlreadySelected = socialSelected?.some(
      (item, i) => item.documentId === newPlatform && i !== index
    );

    if (isAlreadySelected) {
      return;
    }

    const matched = social?.find((opt) => opt.documentId === newPlatform);

    if (matched && social) {
      const updatedSocial = socialSelected.map((link, i) =>
        i === index
          ? {
              name: matched.name,
              baseUrl: matched.baseUrl,
              documentId: matched.documentId,
              customUrl: "",
            }
          : link
      );
      setSocialSelected(updatedSocial);
    }
  };

  const addLink = () => {
    setSocialSelected((prev) => [
      ...(prev ?? []),
      { name: "", documentId: "", baseUrl: "", customUrl: ""  },
    ]);
  };

  const removeLink = (index: number) => {
    setSocialSelected((prev) => prev && prev?.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate({ socialSelected }, { abortEarly: false });
      setErrors(null);
      dispatch({ type: "SET_SOCIAL_DATA", payload: socialSelected });
      router.push("/home/basic-info/detailed-info/approve");
      if (state.editorData.length) {
        setErrors(null);
      } else {
        setErrors("Editor is Null.");
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(err.errors.join(" | "));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 w-full mx-auto pt-10 text-gray-600"
    >
      {socialSelected?.map((link, index) => (
        <div key={index} className="flex gap-2 items-start">
          <select
            value={link.documentId}
            onChange={(e) => handlePlatformChange(index, e.target.value)}
            className="px-2 py-1.5 rounded w-1/3 border-1 border-solid border-gray-400"
          >
            {social?.map((opt) => (
              <option
                key={opt.documentId}
                value={opt.documentId}
                disabled={socialSelected?.some(
                  (link, i) => link.name === opt.name && i !== index
                )}
              >
                {opt.name}
              </option>
            ))}
          </select>
          <div className="flex border rounded overflow-hidden">
            <span className="text-gray-400 pl-3 py-2 text-sm select-none">
              {link.baseUrl}
            </span>
            <input
              type="text"
              value={link.customUrl || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                setSocialSelected((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, customUrl: newValue } : item
                  )
                );
              }}
              className="px-2 py-1 rounded flex-1 border-l-none border-solid border-gray-400 focus:border-l-none outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => removeLink(index)}
            disabled={!socialSelected || socialSelected.length <= 1}
            className="text-red-500 hover:text-red-700 mt-1"
          >
            ✖
          </button>
        </div>
      ))}

      {errors && <p className="text-red-500 text-sm">{errors}</p>}

      <button
        type="button"
        onClick={addLink}
        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        Add New Link
      </button>

      <button
        type="submit"
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!socialSelected || socialSelected.length < 3}
      >
        Save and Continue
      </button>
    </form>
  );
}

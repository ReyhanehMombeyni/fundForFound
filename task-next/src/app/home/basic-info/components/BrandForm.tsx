"use client";

import { Categories, Countries, dataForm, SubCategories, Tag } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePostForm } from "../../context/context";

const schema = yup.object({
  name: yup.string().required(),
  country: yup.string().required(),
  category: yup.string().required(),
  subCategory: yup.string().required(),
});

const BrandForm = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [textType, setTextType] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const [countries, setCountries] = useState<Countries[] | null>(null);
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategories[] | null>(
    null
  );

  const [tags, setTags] = useState<Tag[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[] | null>([]);
  const [selectedCategoryDocId, setSelectedCategoryDocId] = useState<string>("");
  const router= useRouter();
  const { dispatch } = usePostForm();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const getDataBrandPost = async () => {
      const res = await fetch("/api/brand", {
        method: "GET",
      });
      const data = await res.json();
      const { countries, categories, subcategories, tags } = data.dataBrandPost;
      setCountries(countries);
      setCategories(categories);
      setSubCategories(subcategories);
      setTags(tags);
    };
    getDataBrandPost();
  }, []);

  const submitForm = async ({name, country, category, subCategory}: dataForm) => {
    dispatch({type: "SET_FIRST_STEP", payload: {name, country, category, subCategory, selectedTags} });
    router.push("/home/basic-info/detailed-info")
  };

  const handleOnKey = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTextType(false);

      if (selectedTags?.some((tag) => tag.name === inputValue.trim())) {
        setInputValue("");
        return;
      }

      const res = await fetch("/api/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputValue }),
      });
      const data = await res.json();
      const newTag: Tag = data.tag;

      setTags((prev) => (prev ? [...prev, newTag] : [newTag]));
      setSelectedTags((prev) => [...(prev || []), newTag]);
      setInputValue("");
    } else if (e.key === "#") {
      setTextType(true);
    }
  };

  const handleTagSelect = (value: string) => {
    const tagId = Number(value);
    if (selectedTags?.some((tag) => tag.id === tagId)) return;

    const tag = tags?.find((tag) => tag.id === tagId);
    if (tag) {
      setSelectedTags((prev) => [...(prev || []), tag]);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="pt-1 pb-15">
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <div>
          <label className="font-medium text-sm">
            Brand/organization name<span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="input input-primary bg-white w-full"
          />
        </div>
        <div>
          <label className="font-medium text-sm">
            Country<span className="text-error">*</span>
          </label>
          <select
            {...register("country")}
            className="select select-primary bg-white w-full"
          >
            <option value=""></option>
            {countries &&
              countries.map((country) => (
                <option key={country.id} value={country.documentId}>
                  {country.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <p className="text-gray-500 text-sm pt-4 pb-0.5 leading-4">
        Select the primary category that best describes your brad or
        organization. Then select the subcategory that further defines your
        brand or organization.
      </p>
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <div>
          <label className="font-medium text-sm">
            Category<span className="text-error">*</span>
          </label>
          <select
            {...register("category")}
            onChange={(e) => setSelectedCategoryDocId(e.target.value)}
            className="select select-primary bg-white w-full"
          >
            <option value=""></option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.documentId}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="font-medium text-sm">
            Subcategory<span className="text-error">*</span>
          </label>
          <select
            {...register("subCategory")}
            className="select select-primary bg-white w-full"
          >
            <option value={0}></option>
            {subCategories &&
              subCategories
                .filter((sub) => sub.category?.documentId === selectedCategoryDocId)
                .map((sub) => (
                  <option key={sub.id} value={sub.documentId}>
                    {sub.name}
                  </option>
                ))}
          </select>
        </div>
      </div>
      <div className="pt-4">
          <label className="font-medium text-sm">
            Brand tags<span></span>
          </label>
          {textType ? (
            <input
              type="text"
              className="select select-primary bg-white w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleOnKey}
            />
          ) : (
            <select
              className="select select-primary bg-white w-full"
              onChange={(e) => handleTagSelect(e.target.value)}
              onKeyDown={handleOnKey}
            >
              <option value={0}></option>
              {tags &&
                tags.map((tag) => (
                  <option
                    className="text-gray-800"
                    key={tag.id}
                    value={tag.id}
                    disabled={selectedTags?.some((t) => t.id === tag.id)}
                  >
                    {tag.name}
                  </option>
                ))}
            </select>
          )}
          {selectedTags && (
            <div className="pt-2 flex items-center gap-3 text-xs">
              {selectedTags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 text-gray-500 px-3 py-1 rounded-2xl"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-400 pt-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-4 h-4 accent-purple-600 bg-gray-100"
        />
        <span>
          I agree with the{" "}
          <span className="text-purple-600 underline">terms of service</span>
          of 3F.
        </span>
      </div>
      <button
        type="submit"
        className={`btn mt-20 ${
          checked
            ? "btn-primary"
            : "text-gray-400 border-solid border-1 border-gray-300"
        }`}
        disabled={!checked}
      >
        Continue
      </button>
    </form>
  );
};

export default BrandForm;

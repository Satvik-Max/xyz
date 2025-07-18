"use client";
import React, { useState } from "react";

const CategoryKeywordInput = ({
  categoryInput,
  setCategoryInput,
  keywordInput,
  setKeywordInput,
  categories,
  setCategories,
  keywords,
  setKeywords,
}) => {
  const handleCategoryKeyDown = (e) => {
    if (e.key === ",") {
      e.preventDefault();
      if (categoryInput.trim()) {
        setCategories([...categories, categoryInput.trim()]);
        setCategoryInput("");
      }
    }
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === ",") {
      e.preventDefault();
      if (keywordInput.trim()) {
        setKeywords([...keywords, keywordInput.trim()]);
        setKeywordInput("");
      }
    }
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="flex md:flex-row flex-col gap-5">
      {/* Category Input */}
      <div className="flex-col flex w-full gap-2">
        <p className="text-gray-400 font-serif">Category</p>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 outline-none"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={handleCategoryKeyDown}
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-500 font-semibold px-3 text-sm  py-2 rounded cursor-pointer hover:bg-gray-500 hover:text-white transition"
              onClick={() => removeCategory(index)}
            >
              {category} &times;
            </span>
          ))}
        </div>
      </div>

      {/* Keyword Input */}
      <div className="flex-col flex w-full gap-2">
        <p className="text-gray-400 font-serif">Keywords</p>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 outline-none"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleKeywordKeyDown}
        />
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-500 font-semibold px-3 text-sm  py-2 rounded cursor-pointer hover:bg-gray-500 hover:text-white transition"
              onClick={() => removeKeyword(index)}
            >
              {keyword} &times;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryKeywordInput;

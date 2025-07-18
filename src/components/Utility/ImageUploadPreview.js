"use client";
import React, { useState } from "react";

const ImageUploadPreview = ({ name }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="flex-col flex w-full gap-2">
      <p className="text-gray-400 font-serif">{name}</p>
      <input
        type="file"
        accept="image/*"
        className="w-full file:bg-blue-500 file:px-5 file:py-2 file:rounded-full file:border-none file:text-white file:outline-none"
        onChange={handleImageChange}
      />
      {image && (
        <div className="flex flex-col gap-2 mt-4">
          <img
            src={image}
            alt="Preview"
            className="w-full max-w-xs h-auto border border-gray-300 rounded-md"
          />
          <button
            onClick={removeImage}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;

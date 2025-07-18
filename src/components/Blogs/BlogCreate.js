"use client";
import React, { useState } from "react";
import DefaltBtn from "../Utility/DefaltBtn";
import TextEditor from "../TextEditor";
import CategoryKeywordInput from "./CategoryKeywordInput";
import SelectDocumentsModal from "../Modals/SelectDocmentsModal";
import { useAppWrite } from "@/Context/AppWriteContext";
import toast from "react-hot-toast";
import { sanitizeTitle } from "@/Function/Sanitize";
import { GDGCImagesStorageBucket } from "@/config/appwrite";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [article, setArticle] = useState("");
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const { AddDataToCollection } = useAppWrite();
  const [creatingPost, setcreatingPost] = useState(false);
  const [draftingPost, setdraftingPost] = useState(false);

  const createPost = async (isPublished) => {
    try {
      isPublished ? setcreatingPost(true) : setdraftingPost(true);
      const postData = {
        Title: title,
        Description: description,
        FeaturedURL: imageUrl,
        BannerURL: bannerImage,
        Artical: article,
        Category: categories.toString(),
        Keywords: keywords.toString(),
        isPublished,
      };
      if (!title || !description || !article) {
        toast.error("Please fill out all required fields.");
        return;
      }
      await AddDataToCollection(
        process.env.NEXT_PUBLIC_BLOGS_ID,
        postData,
        sanitizeTitle(title)
      );
      toast.success("Post Created");
    } catch (error) {
      toast.error(error.message);
    } finally {
      isPublished ? setcreatingPost(false) : setdraftingPost(false);
    }
  };

  return (
    <div>
      <div className=" border-b pb-2 md:pb-5 flex justify-between items-center ">
        <h2 className="text-base md:text-xl font-semibold">Create blog</h2>
        <div className="flex gap-2">
          <DefaltBtn
            style="font-semibold border border-gray-100 px-5 py-2 rounded-md"
            name="Draft"
            loading={draftingPost}
            func={() => {
              createPost(false);
            }}
          />
          <DefaltBtn
            style="bg-red-500 font-semibold text-white px-5 py-2 rounded-md"
            name="Publish Blog"
            loading={creatingPost}
            func={() => {
              createPost(true);
            }}
          />
        </div>
      </div>

      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex-col flex gap-2">
          <p className="text-gray-400 font-serif">Title</p>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 outline-none"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          {title && (
            <p className="text-xs text-blue-600">{`https://gdgcgcoen.club/blog/${sanitizeTitle(
              title
            )}`}</p>
          )}
        </div>

        <div className="flex-col flex gap-2">
          <p className="text-gray-400 font-serif">Description</p>
          <textarea
            className="w-full border border-gray-300 p-2 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <CategoryKeywordInput
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          keywordInput={keywordInput}
          setKeywordInput={setKeywordInput}
          categories={categories}
          setCategories={setCategories}
          keywords={keywords}
          setKeywords={setKeywords}
        />

        <div className="flex flex-col gap-5 md:flex-row ">
          <div className="w-full">
            <SelectDocumentsModal
              open={true}
              setSelect={setImageUrl}
              BucketID={GDGCImagesStorageBucket}

              name="Select Feature Image"
            />
            {imageUrl && <img src={imageUrl} alt="Feature" />}
          </div>
          <div className="w-full">
            <SelectDocumentsModal
              open={true}
              setSelect={setBannerImage}
              name="Select Banner"
              BucketID={GDGCImagesStorageBucket}

            />
            {bannerImage && <img src={bannerImage} alt="Banner" />}
          </div>
        </div>

        <div className="flex-col flex gap-2">
          <p className="text-gray-400 font-serif">Article</p>
          <TextEditor artical={article} setartical={setArticle} height={500} />
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;

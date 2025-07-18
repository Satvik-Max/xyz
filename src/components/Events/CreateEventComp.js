"use client";
import React, { useState } from "react";
import DefaltBtn from "../Utility/DefaltBtn";
import TextEditor from "../TextEditor";
import CategoryKeywordInput from "../Blogs/CategoryKeywordInput";
import SelectDocumentsModal from "../Modals/SelectDocmentsModal";
import { useAppWrite } from "@/Context/AppWriteContext";
import toast from "react-hot-toast";
import StartEndTimeDate from "./StartEndTimeDate";
import { sanitizeTitle } from "@/Function/Sanitize";
import {
  GDGCFilesStorageBucket,
  GDGCImagesStorageBucket,
} from "@/config/appwrite";

const CreateEventComp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [article, setArticle] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setlocation] = useState("");
  const { AddDataToCollection } = useAppWrite();
  const [creatingPost, setcreatingPost] = useState(false);
  const [draftingPost, setdraftingPost] = useState(false);
  const [Events, setEvents] = useState("upcoming");
  const [Reports, setReports] = useState(null)
  
  const createPost = async (isPublished) => {
    try {
      isPublished ? setcreatingPost(true) : setdraftingPost(true);
      const EventData = {
        Title: title,
        Description: description,
        FeaturedURL: imageUrl,
        BannerURL: bannerImage,
        Artical: article,
        Topics: keywords.toString(),
        isPublished,
        StartDate: new Date(startTime),
        EndDate: new Date(endTime),
        location,
        Event: Events,
        Reports:Reports
      };
      if (!title || !description ) {
        toast.error("Please fill out all required fields.");
        return;
      }
      await AddDataToCollection(
        process.env.NEXT_PUBLIC_EVENTS_ID,
        EventData,
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
        <h2 className="text-base md:text-xl font-semibold">Create Event</h2>
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
            name="Publish Event"
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

        <StartEndTimeDate
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        <div className="flex-col flex gap-2">
          <p className="text-gray-400 font-serif">Location</p>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 outline-none"
            value={location}
            onChange={(e) => {
              setlocation(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-col flex gap-2 w-full">
            <p className="text-gray-400 font-serif">Topics</p>
            <input
              type="text"
              className="w-full border border-gray-300 bg-white p-2 outline-none"
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
              }}
            />
          </div>
          <div className="flex-col flex gap-2 w-full">
            <p className="text-gray-400 font-serif">Event</p>
            <select
              className="w-full border border-gray-300 p-2 outline-none"
              onChange={(e) => {
                setEvents(e.target.value);
              }}
              value={Events}
            >
              <option value="upcoming"> Upcoming</option>
              <option value="past"> Past</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row ">
          <div className="w-full">
            <SelectDocumentsModal
              open={true}
              setSelect={setImageUrl}
              name="Select Feature Image"
              BucketID={GDGCImagesStorageBucket}
            />
            {imageUrl && <img src={imageUrl} alt="Feature" />}
          </div>
          {Events !== "past" && (
            <div className="w-full">
              <SelectDocumentsModal
                open={true}
                setSelect={setBannerImage}
                name="Select Banner"
                BucketID={GDGCImagesStorageBucket}
              />
              {bannerImage && <img src={bannerImage} alt="Banner" />}
            </div>
          )}
          {Events === "past" && (
            <div className="w-full">
              <SelectDocumentsModal
                open={true}
                setSelect={setReports}
                name="Select Report"
                Reports={true}
                BucketID={GDGCFilesStorageBucket}
              />
              <p className="font-semibold" >{Reports}</p>
            </div>
          )}
        </div>
        {Events !== "past" && (
          <div className="flex-col flex gap-2">
            <p className="text-gray-400 font-serif">Article</p>
            <TextEditor
              artical={article}
              setartical={setArticle}
              height={500}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateEventComp;

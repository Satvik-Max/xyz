"use client";
import React, { useEffect, useState } from "react";
import DefaltBtn from "../Utility/DefaltBtn";
import TextEditor from "../TextEditor";
import CategoryKeywordInput from "../Blogs/CategoryKeywordInput";
import SelectDocumentsModal from "../Modals/SelectDocmentsModal";
import { useAppWrite } from "@/Context/AppWriteContext";
import toast from "react-hot-toast";
import StartEndTimeDate from "./StartEndTimeDate";
import moment from "moment";
import {
  GDGCFilesStorageBucket,
  GDGCImagesStorageBucket,
} from "@/config/appwrite";
import { sanitizeTitle } from "@/Function/Sanitize";

const UpdateEventComp = ({ id }) => {
  // State Variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [article, setArticle] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [startTime, setStartTime] = useState(Date);
  const [endTime, setEndTime] = useState(Date);
  const [location, setlocation] = useState("");
  const [Events, setEvents] = useState("");
  const [Reports, setReports] = useState("");

  // Loading State
  const [creatingPost, setCreatingPost] = useState(false);
  const [draftingPost, setDraftingPost] = useState(false);

  // Context
  const { UpdateSingleDocument, GetSingleDocument } = useAppWrite();

  // Fetch Current Blog Details
  const getCurrentBlog = async () => {
    try {
      const rest = await GetSingleDocument(
        id,
        process.env.NEXT_PUBLIC_EVENTS_ID
      );
      console.log(rest);

      const {
        Title,
        Description,
        FeaturedURL,
        BannerURL,
        Artical,
        Topics,
        StartDate,
        EndDate,
        location,
        Event,
        Reports,
      } = rest;

      setTitle(Title);
      setDescription(Description);
      setImageUrl(FeaturedURL);
      setBannerImage(BannerURL);
      setArticle(Artical);
      setlocation(location);
      setKeywords(Topics);
      setStartTime(moment(StartDate).format("YYYY-MM-DDTHH:mm"));
      setEndTime(moment(EndDate).format("YYYY-MM-DDTHH:mm"));
      setEvents(Event);
      setReports(Reports);
    } catch (error) {
      toast.error("Failed to fetch Event details.");
    }
  };

  useEffect(() => {
    getCurrentBlog();
  }, []);

  // Update Blog Function
  const updateBlog = async (isPublished) => {
    try {
      isPublished ? setCreatingPost(true) : setDraftingPost(true);

      if (!title || !description) {
        toast.error("Please fill out all required fields.");
        return;
      }

      const postData = {
        Title: title,
        Description: description,
        FeaturedURL: imageUrl,
        BannerURL: bannerImage,
        Artical: article,
        Topics: keywords.toString(),
        StartDate: startTime,
        EndDate: endTime,
        isPublished,
        Event: Events,
        Reports,
        location,
      };

      const res = await UpdateSingleDocument(
        id,
        process.env.NEXT_PUBLIC_EVENTS_ID,
        postData
      );

      console.log(res);
      toast.success("Post Updated");
    } catch (error) {
      toast.error(error.message);
    } finally {
      isPublished ? setCreatingPost(false) : setDraftingPost(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="border-b pb-2 md:pb-5 flex justify-between items-center">
        <h2 className="text-base md:text-xl font-semibold">Update Event</h2>
        <div className="flex gap-2">
          <DefaltBtn
            style="font-semibold border border-gray-100 px-5 py-2 rounded-md"
            name="Draft"
            loading={draftingPost}
            func={() => updateBlog(false)}
          />
          <DefaltBtn
            style="bg-red-500 font-semibold text-white px-5 py-2 rounded-md"
            name="Update Event"
            loading={creatingPost}
            func={() => updateBlog(true)}
          />
        </div>
      </div>

      {/* Form Section */}
      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex-col flex gap-2">
          <p className="text-gray-400 font-serif">Title</p>
          <input
            type="text"
            className="w-full border disabled:bg-gray-100 border-gray-300 p-2 outline-none"
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
              <p className="font-semibold">{Reports}</p>
            </div>
          )}
        </div>
        {Events != "past" && (
          <div className="flex-col flex gap-2">
            <p className="text-gray-400 font-serif">Article</p>
            {article && (
              <TextEditor
                artical={article}
                setartical={setArticle}
                height={500}
              />
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateEventComp;

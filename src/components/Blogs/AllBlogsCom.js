"use client";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";
import { BlogsCollection } from "@/config/appwrite";
import { Query } from "appwrite";

const AllBlogsCom = () => {
  const { ListCollectionData } = useAppWrite();
  const [loading, setloading] = useState(false);
  const [blogs, setblogs] = useState([]);

  const [ErrorMsg, setErrorMsg] = useState("");
  const getBlogs = async () => {
    try {
      setloading(true);
      const res = await ListCollectionData(BlogsCollection, [
        Query.orderDesc("$createdAt"),
      ]);
      setblogs(res?.documents);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);

  return (
    <div>
      {loading && "Loading..."}
      {ErrorMsg && <div className="py-5 ">{ErrorMsg}</div>}

      {!loading && !ErrorMsg && (
        <MUITable
          type="blog"
          collectionID={BlogsCollection}
          read={true}
          update={true}
          deleteitem={true}
          data={blogs}
          getDatafun={getBlogs}
          loading={loading}
          exclude={[
            "FeaturedURL",
            "BannerURL",
            "Artical",
            "$permissions",
            "$createdAt",
            "$updatedAt",
            "$databaseId",
            "$collectionId",
          ]}
        />
      )}
    </div>
  );
};

export default AllBlogsCom;

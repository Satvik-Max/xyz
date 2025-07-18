"use client";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";
import { UsersCollection } from "@/config/appwrite";
import toast from "react-hot-toast";
import { Query } from "appwrite";

const UsersAll = () => {
  const { ListCollectionData } = useAppWrite();
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState("");
  const getUsers = async () => {
    try {
      setloading(true);
      const res = await ListCollectionData(UsersCollection, [
        Query.orderDesc("$createdAt"),
      ]);
      
      setusers(res?.documents);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {loading && "Loading..."}
      {ErrorMsg && <div className="py-5 ">{ErrorMsg}</div>}

      {(!loading && !ErrorMsg) && (
        <MUITable
          type="blog"
          data={users}
          loading={loading}
          exclude={[
            "FeaturedURL",
            "BannerURL",
            "Artical",
            "$permissions",
            "$createdAt",
            "$updatedAt",
            "$databaseId",
            "$id",
            "$collectionId",
          ]}
        />
      )}
    </div>
  );
};

export default UsersAll;

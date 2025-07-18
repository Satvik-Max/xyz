"use client";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";
import { EventRegistrationID } from "@/config/appwrite";
import { Query } from "appwrite";

const UserEventRegister = () => {
  const { ListCollectionData } = useAppWrite();
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState("");
  const getUsers = async () => {
    try {
      setloading(true);
      const res = await ListCollectionData(EventRegistrationID, [
        Query.orderDesc("$createdAt"),
        Query.limit(200),
      ]);
      console.log(res?.documents);

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

      {!loading && !ErrorMsg && (
        <MUITable
          type="blog"
          data={users}
          loading={loading}
          exclude={[
            "events",
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

export default UserEventRegister;

"use client";

import React, { useEffect, useState } from "react";
import { useAppWrite } from "@/Context/AppWriteContext";
import MUITable from "../Utility/MUITable";
import { StudentDistribution } from "@/config/appwrite";
import { Query } from "appwrite";
import toast from "react-hot-toast";
import { Upload } from "@mui/icons-material";
import { thankGoogleCloud } from "@/SampleData/GmailTemplate";

const UserEventRegister = () => {
  const { ListCollectionData, UpdateSingleDocument, AddDataToCollection } =
    useAppWrite();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await ListCollectionData(StudentDistribution, [
        Query.orderDesc("$createdAt"),
        Query.limit(100),
      ]);
      console.log(res?.documents);
      setUsers(res?.documents);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateField = async (id, value, nameUser) => {
    try {
      console.log(nameUser);

      await UpdateSingleDocument(id, StudentDistribution, { isClaimed: value });
      const htmlTemp = await thankGoogleCloud(nameUser?.Name);
      const res = await fetch("/api/SendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameUser.Name,
          email: nameUser?.email,
          message: htmlTemp,
          subject: `🎉 Congratulations, ${nameUser?.Name}! Your Study Jam Swags Are Claimed!`,
        }),
      });
      getUsers();
      if (res.ok) {
        toast.success(nameUser.Name + " send Mail Successfully!");
      }
    } catch (error) {
      console.error("Error updating field:", error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {errorMsg && <div className="py-5">{errorMsg}</div>}
      {!loading && !errorMsg && (
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
          getDatafun={getUsers}
          updateField={updateField}
        />
      )}
    </div>
  );
};

export default UserEventRegister;

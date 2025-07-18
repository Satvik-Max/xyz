"use client";
import { TeamValidationCollection } from "@/config/appwrite";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";

const TeamsScore = () => {
  const { ListCollectionData } = useAppWrite();
  const [uniqueTeams, setuniqueTeams] = useState([]);
  const [teamsData, setteamsData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  if (error) {
    setTimeout(() => {
      seterror("");
    }, 5000);
  }
  const getTeamsScore = async () => {
    try {
      setloading(true);
      const res = await ListCollectionData(TeamValidationCollection);
      setteamsData(res.documents);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getTeamsScore();
  }, []);

  return (
    <div className="">
      {loading && "loading..."}

      {!loading && !error && (
        <MUITable
          type="blog"
          collectionID={TeamValidationCollection}
          read={false}
          update={false}
          deleteitem={false}
          data={teamsData}
          getDatafun={getTeamsScore}
          loading={loading}
          exclude={[
            "$permissions",
            "hackOnTeams",
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

export default TeamsScore;

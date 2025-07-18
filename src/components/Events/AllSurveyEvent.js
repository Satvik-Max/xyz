"use client";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";
import {  EventSurveyCollection } from "@/config/appwrite";
import { Query } from "appwrite";

const AllSurveyEvent = () => {
  const { ListCollectionData } = useAppWrite();
  const [loading, setloading] = useState(false);
  const [events, setevents] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState("");


  const getevents = async () => {
    try {
      setloading(true);
      const res = await ListCollectionData(EventSurveyCollection, [
        Query.orderDesc("$createdAt"),
      ]);
      setevents(res?.documents);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getevents();
  }, []);

  return (
    <div>
      {loading && "Loading..."}
      {ErrorMsg && <div className="py-5 ">{ErrorMsg}</div>}

      {!loading && !ErrorMsg && (
        <MUITable
          type="event"
          collectionID={EventSurveyCollection}
          data={events}
          read={true}
          update={true}
          deleteitem={true}
          getDatafun={getevents}
          loading={loading}
          exclude={[
            "FeaturedURL",
            "BannerURL",
            "Artical",
            "Description",
            "$permissions",
            "$createdAt",
            "$updatedAt",
            "$databaseId",
            "$collectionId",
            "$id",
            "Reports"
          ]}
        />
      )}
    </div>
  );
};

export default AllSurveyEvent;

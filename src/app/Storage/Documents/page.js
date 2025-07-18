"use client";
import React, { useState } from "react";
import { GDGCFilesStorageBucket } from "@/config/appwrite";
import AllReportsDocs from "@/components/Documents/AllReportsDocs";

const Documents = () => {
  return (
    <div>
      <div className=" justify-between items-center flex gap-5">
        <h2 className={`  font-semibold `}>List All Documents</h2>
      </div>

      <div className="mt-5">
        {" "}
        <AllReportsDocs BucketID={GDGCFilesStorageBucket} />
      </div>
    </div>
  );
};

export default Documents;

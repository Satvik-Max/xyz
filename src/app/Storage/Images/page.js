"use client";
import React, { useState } from "react";
import AllDocuments from "@/components/Documents/AllDocuments";
import { GDGCImagesStorageBucket } from "@/config/appwrite";

const Documents = () => {
  return (
    <div>
      <div className=" justify-between items-center flex gap-5">
        <h2 className={`  font-semibold `}>List All Documents</h2>
      </div>

      <div className="mt-5">
        {" "}
        <AllDocuments 
        BucketID={GDGCImagesStorageBucket}
        />
      </div>
    </div>
  );
};

export default Documents;

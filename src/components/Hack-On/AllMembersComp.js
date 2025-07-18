"use client";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";
import { HackOnMembersCollection } from "@/config/appwrite";
import { Query } from "appwrite";
import { useHackOn } from "@/Context/HackOnContext";
import toast from "react-hot-toast";
import { handleExport } from "@/Function/DownloadRecords";
import { Download } from "lucide-react";

const AllMembersComp = () => {
  const { hackOnMembers, loadingMembers, ErrorMsgMembers, getHackOnMembers } =
    useHackOn();

  function extractTeamInfo(dataArray) {
    return dataArray.map((item) => ({
      Name: item.Name || "",
      PhNumber: item.PhNumber || "",
      email: item.email || "",
      Role: item.Role || "",
      TeamName: item.hackOnTeams?.TeamName || "",
    }));
  }
  const [downloading, setdownloading] = useState(false);

  const handleDownload = () => {
    try {
      setdownloading(true);
      const result = handleExport(
        extractTeamInfo(hackOnMembers),
        "HackOnMembers"
      );
      toast.success("Downloaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setdownloading(false);
    }
  };

  return (
    <div>
      {loadingMembers && "LoadingMembers..."}
      {ErrorMsgMembers && <div className="py-5 ">{ErrorMsgMembers}</div>}
      <button
        type="button"
        onClick={handleDownload}
        className="bg-red-500 flex gap-2 text-sm px-5 py-2 rounded-md text-white"
      >
        <Download size={15} />
        {downloading ? "Downloading..." : "Download"}
      </button>
      {!loadingMembers && !ErrorMsgMembers && (
        <MUITable
          type="blog"
          collectionID={HackOnMembersCollection}
          read={false}
          update={false}
          deleteitem={false}
          data={hackOnMembers}
          getDatafun={getHackOnMembers}
          loading={loadingMembers}
          exclude={[
            "$permissions",
            "hackOnTeams",
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

export default AllMembersComp;

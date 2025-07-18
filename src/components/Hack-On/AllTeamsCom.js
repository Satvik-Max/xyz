"use client";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";
import { HackOnTeamsCollection } from "@/config/appwrite";
import { Query } from "appwrite";
import { useHackOn } from "@/Context/HackOnContext";

const AllTeamsCom = () => {
  const { hackOnTeams,loadingTeams, ErrorMsgTeams,getHackOnTeams } = useHackOn();

  return (
    <div>
      {loadingTeams && "LoadingTeams..."}
      {ErrorMsgTeams && <div className="py-5 ">{ErrorMsgTeams}</div>}

      {!loadingTeams && !ErrorMsgTeams && (
        <MUITable
          type="blog"
          collectionID={HackOnTeamsCollection}
          read={false}
          update={false}
          viewMembers={true}
          deleteitem={false}
          data={hackOnTeams}
          seeDetails={true}
          getDatafun={getHackOnTeams}
          loading={loadingTeams}
          exclude={[
            "$permissions",
            "$updatedAt",
            "$databaseId",
            "$collectionId",
            "LYear",
            "LDepartment",
            "Amount",
            "$createdAt",
            
            "LCollege"
          ]}
        />
      )}
    </div>
  );
};

export default AllTeamsCom;

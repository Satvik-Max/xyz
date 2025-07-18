"use client";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";
import { CoupansCollection } from "@/config/appwrite";
import { useHackOn } from "@/Context/HackOnContext";

const AllCouponsCom = () => {
  const { allCoupons, getCopons, laodingCopons, CoponsErrorMsg } = useHackOn();

  return (
    <div>
      {laodingCopons && "Loading..."}
      {CoponsErrorMsg && <div className="py-5 ">{CoponsErrorMsg}</div>}

      {!laodingCopons && !CoponsErrorMsg && (
        <MUITable
          type="event"
          collectionID={CoupansCollection}
          data={allCoupons}
          read={false}
          update={false}
          deleteitem={true}
          getDatafun={getCopons}
          loading={laodingCopons}
          exclude={[
            "$permissions",
            "$createdAt",
            "$updatedAt",
            "$databaseId",
            "$collectionId",
            "$id",
            "Reports",
          ]}
        />
      )}
    </div>
  );
};

export default AllCouponsCom;

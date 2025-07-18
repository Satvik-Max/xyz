"use client";
import StudyJam from "@/components/StudyJam/SwagDist";
import React from "react";

const EventRegisterUsers = () => {
  return (
    <div>
      <div className=" border-b pb-2 md:pb-5 flex justify-between items-center ">
        <h2 className="text-base md:text-xl font-semibold">All Users</h2>
      </div>
      <StudyJam />
    </div>
  );
};

export default EventRegisterUsers;

"use client";
import AllSurveyEvent from "@/components/Events/AllSurveyEvent";
import { useRouter } from "next/navigation";
import React from "react";

const EventSurvey = () => {
  const router = useRouter();
  return (
    <div>
      <div className=" border-b pb-2 md:pb-5 flex justify-between items-center ">
        <h2 className="text-base md:text-xl font-semibold">Events Survey</h2>
      </div>
      <AllSurveyEvent />
    </div>
  );
};

export default EventSurvey;

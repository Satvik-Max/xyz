"use client";
import AllEventsCom from "@/components/Events/AllEventsCom";
import DefaltBtn from "@/components/Utility/DefaltBtn";
import { useRouter } from "next/navigation";
import React from "react";

const AllEvents = () => {
  const router = useRouter();
  return (
    <div>
      <div className=" border-b pb-2 md:pb-5 flex justify-between items-center ">
        <h2 className="text-base md:text-xl font-semibold">All Events</h2>
        <div className="flex gap-2">
          <DefaltBtn
            style="bg-red-500 font-semibold text-white px-5 py-2 rounded-md"
            name="Create Event"
            func={() => {
              router.push("/Events/CreateEvent");
            }}
          />
        </div>
      </div>
      <AllEventsCom />
    </div>
  );
};

export default AllEvents;

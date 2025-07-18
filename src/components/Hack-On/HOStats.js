"use client";
import { useHackOn } from "@/Context/HackOnContext";
import { Users, UsersRound } from "lucide-react";
import React from "react";

const SkeletonBox = () => (
  <div className="flex items-center gap-5 min-w-56 border rounded-md p-2 animate-pulse">
    <div className="w-7 h-7 bg-gray-300 rounded-full" />
    <div className="space-y-2">
      <div className="h-5 w-32 bg-gray-200 rounded" />
      <div className="h-5 w-16 bg-gray-300 rounded" />
    </div>
  </div>
);

const HOStats = () => {
  const { presenting } = useHackOn();

  return (
    <div className="flex  gap-2 border-b pb-5 ">
      <div className="flex w-full gap-5 overflow-x-scroll">
        {presenting.loading ? (
          <>
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
          </>
        ) : (
          <>
            <div className="flex items-center gap-5 min-w-56 border  rounded-md p-2">
              <Users size={28} strokeWidth={1.5} />
              <div>
                <h1 className=" text-base md:text-xl text-gray-500 font-semibold">
                  Total Teams
                </h1>
                <p className=" text-base md:text-xl font-semibold">
                  {presenting.totalTeams}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 min-w-56 border rounded-md p-2">
              <UsersRound size={28} strokeWidth={1.5} />
              <div>
                <h1 className=" text-base md:text-xl text-gray-500 font-semibold">
                  Total Attendees
                </h1>
                <p className=" text-base md:text-xl font-semibold">
                  {presenting?.totalMembers}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 min-w-56 border rounded-md p-2">
              <UsersRound size={28} strokeWidth={1.5} />
              <div>
                <h1 className=" text-base md:text-xl text-gray-500 font-semibold">
                  Present Teams
                </h1>
                <p className=" text-base md:text-xl font-semibold">
                  {presenting?.totalteamPresent}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 min-w-56 border rounded-md p-2">
              <UsersRound size={28} strokeWidth={1.5} />
              <div>
                <h1 className=" text-base md:text-xl text-gray-500 font-semibold">
                  Upsent Teams
                </h1>
                <p className=" text-base md:text-xl font-semibold">
                  {presenting?.totalteamupsent}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HOStats;

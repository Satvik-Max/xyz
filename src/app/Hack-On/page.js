"use client";
import AllMembersComp from "@/components/Hack-On/AllMembersComp";
import AllTeamsCom from "@/components/Hack-On/AllTeamsCom";
import { useHackOn } from "@/Context/HackOnContext";
import React, { useState } from "react";
import { Users, UsersRound, CreditCard, LaptopMinimal } from "lucide-react";
import RazorpayRecords from "@/components/Hack-On/RazorpayRecords";
import AddNewTeam from "@/components/Hack-On/AddNewTeam";
import TeamsScore from "@/components/Hack-On/TeamsScore";

export default function HackOnPage() {
  const { teamLoading } = useHackOn();
  const [view, setView] = useState("teams");

  return (
    <div className="">
      {/* Toggle Buttons */}
      <div className=" overflow-x-scroll flex gap-4 mb-4">
        <button
          onClick={() => setView("teams")}
          className={`flex items-center text-sm gap-2 px-4 min-w-fit py-2 rounded-lg font-semibold transition-all ${
            view === "teams"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Users size={15} />
          Teams
        </button>

        <button
          onClick={() => setView("attendees")}
          className={`flex items-center text-sm gap-2 px-4 min-w-fit py-2 rounded-lg font-semibold transition-all ${
            view === "attendees"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <UsersRound size={15} />
          Attendees
        </button>
        <button
          onClick={() => setView("TeamScore")}
          className={`flex items-center text-sm gap-2 px-4 min-w-fit py-2 rounded-lg font-semibold transition-all ${
            view === "TeamScore"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <LaptopMinimal size={15} />
          Teams Score
        </button>

        <button
          onClick={() => setView("razorpay")}
          className={`flex items-center text-sm gap-2 px-4 min-w-fit py-2 rounded-lg font-semibold transition-all ${
            view === "razorpay"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <CreditCard size={15} />
          Razorpay Records
        </button>

        <button
          onClick={() => setView("addTeams")}
          className={`flex items-center text-sm gap-2 px-4 min-w-fit py-2 rounded-lg font-semibold transition-all ${
            view === "addTeams"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <CreditCard size={15} />
          Add Teams
        </button>
      </div>

      {/* Display Teams, Attendees, or Razorpay Records */}
      {teamLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : view === "teams" ? (
        <AllTeamsCom />
      ) : view === "attendees" ? (
        <AllMembersComp />
      ) : view === "razorpay" ? (
        <RazorpayRecords />
      ) : view === "TeamScore" ? (
        <TeamsScore />
      ) : (
        <AddNewTeam />
      )}
    </div>
  );
}

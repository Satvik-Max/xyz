"use client";
import React, { useState } from "react";
import { Box, Button, Modal, CircularProgress } from "@mui/material";
import {
  Scan,
  Camera,
  XCircle,
  CheckCircle,
  Mail,
  Phone,
  GraduationCap,
  Users,
  X,
} from "lucide-react";

import toast from "react-hot-toast";
import { useAppWrite } from "@/Context/AppWriteContext";
import {
  HackOnMembersCollection,
  HackOnTeamsCollection,
} from "@/config/appwrite";

import { Query } from "appwrite";
import TeamMembersLoadingSkeleton from "../Utility/TeamMembersLoadingSkeleton";
import { TeamCard } from "./QRScannerModal";
import ScoreValidation from "../Hack-On/ScoreValidation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

export default function TeamDetailsModal({ teamData }) {
  const [open, setOpen] = useState(false);
  const [teamMembers, setteamMembers] = useState([]);
  const [memberLoading, setmemberLoading] = useState(false);
  const { ListCollectionData } = useAppWrite();
  const [currentTeam, setcurrentTeam] = useState(teamData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const getMembers = async () => {
    setmemberLoading(true);
    try {
      const res = await ListCollectionData(HackOnMembersCollection, [
        Query.equal("hackOnTeams", currentTeam.$id),
      ]);
      return setteamMembers(res.documents);
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setmemberLoading(false);
    }
  };

  console.log(teamMembers);

  return (
    <div>
      <button
        onClick={() => {
          handleOpen();
          getMembers();
        }}
        className="p-2 rounded-md border text-xs border-gray-300 bg-white  hover:bg-gray-100 transition"
      >
        Details
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          className="relative p-5 pt-5  flex flex-col  gap-2  min-h-[250px] md:h-fit md:rounded-lg w-full md:w-[60%] h-screen"
        >
          <button
            onClick={handleClose}
            className="border border-gray-300 rounded-md w-10 h-10 grid place-items-center   bg-gray-50 p-2"
          >
            <X size={20} />
          </button>
          <div className="flex flex-col md:flex-row  gap-5">
            <div className="w-full  ">
              <h2 className="font-semibold text-xl">Team Details</h2>
              <TeamCard
                team={currentTeam}
                setScanenedteamdata={setcurrentTeam}
              />
              {memberLoading && <TeamMembersLoadingSkeleton />}
              {!memberLoading && teamMembers.length == 0 && (
                <div className="text-center">No Team Members</div>
              )}
              {!memberLoading && teamMembers.length != 0 && (
                <div className="mt-6 overflow-x-auto">
                  <table className="text-xs md:text-sm w-full border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-blue-600 text-white uppercase text-sm tracking-wide sticky top-0">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">
                          Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Phone Number
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Email
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Role
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member, index) => (
                        <tr
                          key={member.$id}
                          className={`text-center ${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } hover:bg-blue-100 transition`}
                        >
                          <td className="border border-gray-300 px-4 py-3 font-medium">
                            {member.Name}
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            {member.PhNumber}
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            {member.email}
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            {member.Role}
                          </td>
                          <td
                            className={`border border-gray-300 px-4 py-3 font-semibold ${
                              member.isInside
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {member.isInside ? "Inside" : "Outside"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* <ScoreValidation TeamData={currentTeam} TeamID={currentTeam.$id} /> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

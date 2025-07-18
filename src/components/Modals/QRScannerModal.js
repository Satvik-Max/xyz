"use client";
import React, { useEffect, useState } from "react";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

export default function QRScannerModal({
  handleScanClick,
  isScanning,
  startQrScanner,
  stopScanner,
  TeamsData,
  fetchingUser,
  setScanenedteamdata,
  ErrorMessage,
  setErrorMessage,
}) {
  const [open, setOpen] = useState(false);
  const [teamMembers, setteamMembers] = useState([]);
  const [memberLoading, setmemberLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const { ListCollectionData } = useAppWrite();
  const handleClose = () => {
    setOpen(false);
    setScanenedteamdata(null);
    setteamMembers([]);
  };
  const getMembers = async () => {
    setmemberLoading(true);
    try {
      const res = await ListCollectionData(HackOnMembersCollection, [
        Query.equal("hackOnTeams", TeamsData?.$id),
      ]);
      return setteamMembers(res.documents);
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setmemberLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          handleScanClick();
          handleOpen();
        }}
        className="p-2 rounded-md border border-gray-300 bg-white shadow-md hover:bg-gray-100 transition"
      >
        <Scan size={20} strokeWidth={1.5} className="text-gray-700" />
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

          {ErrorMessage && (
            <p className="text-red-600 text-sm">{ErrorMessage}</p>
          )}
          {fetchingUser && (
            <div className="w-full h-full grid place-items-center">
              <CircularProgress />
            </div>
          )}
          {TeamsData && (
            <TeamCard
              team={TeamsData}
              setScanenedteamdata={setScanenedteamdata}
            />
          )}

          {TeamsData && (
            <button
              onClick={getMembers}
              className="p-2 border rounded-md my-2 px-5 w-full"
            >
              {memberLoading ? (
                <TeamMembersLoadingSkeleton />
              ) : (
                "View Team Members"
              )}
            </button>
          )}
          {teamMembers.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="text-xs md:text-sm w-full border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-blue-600 text-white uppercase text-sm tracking-wide sticky top-0">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Phone Number
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
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
                          member.isInside ? "text-green-600" : "text-red-600"
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
          {isScanning && (
            <div className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
              <div
                id="qr-reader"
                style={{ width: "100%", height: "100%" }}
                className=" flex items-center justify-center bg-gray-100 rounded-md"
              >
                <p className=" p-5 py-10 text-gray-500">
                  QR Scanner will appear here
                </p>
              </div>

              <div className="flex justify-between w-full gap-4">
                <button
                  onClick={startQrScanner}
                  className="flex gap-2 items-center w-full font-semibold  bg-red-500 text-white p-2 rounded-md"
                >
                  <Camera size={20} />
                  Start Scanning
                </button>

                <button
                  onClick={() => {
                    stopScanner();
                    handleClose();
                  }}
                  className="flex gap-2 items-center w-full font-semibold  bg-blue-500 text-white p-2 rounded-md"
                >
                  <XCircle size={20} />
                  Stop Scanning
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export const TeamCard = ({ team, setScanenedteamdata }) => {
  const { UpdateSingleDocument } = useAppWrite();
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-5 w-full rounded-xl  border border-gray-300 bg-white">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Users className="text-blue-600" size={22} /> {team.TeamName}
      </h2>
      <p className="text-gray-600 text-sm mt-1 py-2">{team.LName}</p>

      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="text-blue-600" size={18} />{" "}
          <span>{team.LEmail}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <GraduationCap className="text-green-600" size={18} />
          <span>
            {team.LCollege} | {team.LYear} Year
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="text-yellow-600" size={18} />{" "}
          <span>{team.LPhoneNo}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {team.isAttend ? (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle size={20} /> Attended
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600">
            <XCircle size={20} /> Not Attended
          </span>
        )}
      </div>

      {!team.isAttend && (
        <button
          className=" border p-2 px-5 bg-blue-500 text-white rounded-md mt-5"
          onClick={async () => {
            try {
              setLoading(true);
              const updatedTeam = await UpdateSingleDocument(
                team.$id,
                HackOnTeamsCollection,
                { isAttend: true }
              );
              setScanenedteamdata(updatedTeam);
              toast.success(`${updatedTeam?.TeamName} is Present`);
            } catch (error) {
              toast.error(error.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Mark as Attended"
          )}
        </button>
      )}
    </div>
  );
};

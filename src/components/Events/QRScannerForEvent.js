"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Modal, CircularProgress } from "@mui/material";
import {
  Scan,
  Camera,
  XCircle,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
} from "lucide-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

export default function QRScannerForEvent({
  handleScanClick,
  isScanning,
  startQrScanner,
  stopScanner,
  Users,
  fetchingUser,
  setScanenedteamdata,
  ErrorMessage,
  setErrorMessage,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true); // Start loading when modal opens
    handleScanClick(); // Start scanning
  };

  const handleClose = () => {
    setOpen(false);
    setScanenedteamdata(null);
  };

  // Stop loading when user data is available
  useEffect(() => {
    if (Users) {
      setLoading(false);
    }
  }, [Users]);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="p-2 rounded-md border border-gray-300 bg-white shadow-md hover:bg-gray-100 transition"
      >
        <Scan size={20} strokeWidth={1.5} className="text-gray-700" />
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          className="relative p-5 pt-5 flex flex-col gap-4 min-h-[300px] md:h-fit md:rounded-lg w-full md:w-[60%] h-screen bg-white shadow-lg"
        >
          <button
            onClick={handleClose}
            className="border border-gray-300 rounded-md w-10 h-10 grid place-items-center bg-gray-50 p-2"
          >
            <X size={20} />
          </button>

          {ErrorMessage && (
            <p className="text-red-600 text-sm">{ErrorMessage}</p>
          )}

          {isScanning ? (
            <div className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
              <div
                id="qr-reader"
                style={{ width: "100%", height: "100%" }}
                className="flex items-center justify-center bg-gray-100 rounded-md"
              >
                <p className="p-5 py-10 text-gray-500">
                  QR Scanner will appear here
                </p>
              </div>

              <div className="flex justify-between w-full gap-4">
                <button
                  onClick={startQrScanner}
                  className="flex gap-2 items-center w-full font-semibold bg-red-500 text-white p-2 rounded-md"
                >
                  <Camera size={20} />
                  Start Scanning
                </button>

                <button
                  onClick={() => {
                    stopScanner();
                    handleClose();
                  }}
                  className="flex gap-2 items-center w-full font-semibold bg-blue-500 text-white p-2 rounded-md"
                >
                  <XCircle size={20} />
                  Stop Scanning
                </button>
              </div>
            </div>
          ) : fetchingUser ? (
            // Show loading spinner after scanning before displaying user data
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <CircularProgress size={40} />
              <p className="text-gray-500 mt-2">Fetching user data...</p>
            </div>
          ) : (
            Users && (
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">
                  Scanned User Details
                </h2>
                <div className="mt-2 space-y-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <User size={18} />
                    <span>{Users.UserName}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Mail size={18} />
                    <span>{Users.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Phone size={18} />
                    <span>{Users.phoneNo}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Calendar size={18} />
                    <span>
                      {Users.CollegeName} - {Users.YearOFStudy}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <CheckCircle
                      size={18}
                      className={
                        Users.isAttend ? "text-green-500" : "text-red-500"
                      }
                    />
                    <span>
                      {Users.isAttend ? "Attending" : "Not Attending"}
                    </span>
                  </p>
                </div>
              </div>
            )
          )}
        </Box>
      </Modal>
    </div>
  );
}

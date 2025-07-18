"use client";
import { RefreshCcw, Scan } from "lucide-react";
import React, { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import toast from "react-hot-toast";
import { useAppWrite } from "@/Context/AppWriteContext";
import { EventRegistrationID } from "@/config/appwrite";
import QRScannerForEvent from "./QRScannerForEvent";

const EventHeaderUser = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const { GetSingleDocument, UpdateSingleDocument } = useAppWrite();
  const [Scanenedteamdata, setScanenedteamdata] = useState(null);
  const [fetchingUser, setfetchingUser] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  if (ErrorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  }
  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      const qrScanner = new Html5Qrcode("qr-reader");
      setHtml5QrCode(qrScanner);
    }, 100);
  };

  const startQrScanner = () => {
    if (!html5QrCode) {
      toast.error(
        "QR Scanner not initialized. Click the 'Scan QR' button first."
      );
      alert("Please click 'Scan QR' to initialize the scanner.");
      return;
    }

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 300 },
        (qrCodeMessage) => {
          handleScanResult(qrCodeMessage);
          stopScanner();
        },
        (errorMessage) => {
          console.error("QR Code scanning error:", errorMessage);
        }
      )
      .catch((err) => {
        console.error("Failed to start QR scanner:", err);
      });
  };

  const stopScanner = () => {
    if (html5QrCode) {
      html5QrCode.stop().then(() => {
        console.log("Camera stopped.");
        setIsScanning(false);
        setHtml5QrCode(null);
      });
    }
    setScanenedteamdata(null);
  };

  const handleScanResult = async (message) => {
    try {
      setfetchingUser(true);
      const userData = await GetSingleDocument(message, EventRegistrationID);
      const newdata = await UpdateSingleDocument(
        userData?.$id,
        EventRegistrationID,
        { isAttend: true }
      );
      return setScanenedteamdata(newdata);
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
      throw new Error(error.message);
    } finally {
      setfetchingUser(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl md:text-2xl font-semibold">All Users</h1>
      <div className="flex gap-2">
        <button className="bg-gray-50 p-2 rounded-md border border-gray-300">
          <RefreshCcw size={20} strokeWidth={1.5} />
        </button>
        <QRScannerForEvent
          handleScanClick={handleScanClick}
          isScanning={isScanning}
          setScanenedteamdata={setScanenedteamdata}
          startQrScanner={startQrScanner}
          Users={Scanenedteamdata}
          setErrorMessage={setErrorMessage}
          stopScanner={stopScanner}
          ErrorMessage={ErrorMessage}
          setSelect={true}
          fetchingUser={fetchingUser}
        />
      </div>
    </div>
  );
};

export default EventHeaderUser;

"use client";
import { HackOnTimerCollection } from "@/config/appwrite";
import { useAppWrite } from "@/Context/AppWriteContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HackOnTimer = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  const { ListCollectionData, UpdateSingleDocument } = useAppWrite();

  const handleUpdateClock = async () => {
    setLoading(true);
    try {
      const resClock = await ListCollectionData(HackOnTimerCollection);

      const res = await UpdateSingleDocument(
        resClock.documents[0].$id,
        HackOnTimerCollection,
        {
          startTime,
          endTime,
          Description: notification,
        }
      );
      toast.success("Clock Updated");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetCurrentClockData = async () => {
    try {
      const res = await ListCollectionData(HackOnTimerCollection);
      setStartTime(res.documents[0].startTime);
      setEndTime(res.documents[0].endTime);
      setNotification(res.documents[0].Description);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    GetCurrentClockData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p>Start Time</p>
        <input
          className="border disabled:bg-gray-100 w-full outline-none rounded-md p-2 "
          placeholder="Ex. 8:00"
          type="text"
          disabled={true}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <p>End Time</p>
        <input
          className="border disabled:bg-gray-100 w-full outline-none rounded-md p-2 "
          placeholder="Ex. 6:00"
          type="text"
          disabled={true}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <p>Notification</p>
        <textarea
          className="border w-full outline-none rounded-md p-2 "
          placeholder="Ex. Get Started"
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 font-semibold text-white p-2 rounded-md disabled:bg-blue-300"
        onClick={handleUpdateClock}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Clock"}
      </button>
    </div>
  );
};

export default HackOnTimer;

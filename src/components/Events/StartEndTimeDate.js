import React from "react";

const StartEndTimeDate = ({ startTime, setStartTime, endTime, setEndTime }) => {
  return (
    <div className="flex  w-full md:flex-row flex-col gap-5">
      <div className="flex-col w-full flex gap-2">
        <p className="text-gray-400 font-serif">Start Date Time</p>
        <input
          type="datetime-local"
          className="w-full border border-gray-300 p-2 outline-none"
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />
      </div>
      <div className="flex-col w-full flex gap-2">
        <p className="text-gray-400 font-serif">End Date Time</p>
        <input
          type="datetime-local"
          className="w-full border border-gray-300 p-2 outline-none"
          value={endTime}
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default StartEndTimeDate;

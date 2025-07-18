"use client";
import React, { useEffect, useState } from "react";
import MUITable from "../Utility/MUITable";

const RazorpayRecords = () => {
  const [razorpayRecords, setrazorpayRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsgTeams, setErrorMsgTeams] = useState("");

  const getRecords = async () => {
    setLoading(true); // ✅ Set loading to true before fetching
    setErrorMsgTeams(""); // ✅ Clear error message before fetching

    try {
      const res = await fetch("/api/Razorpay/GetRecords");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.description || "Failed to fetch payments");
      }
      setrazorpayRecords(data.Data || []); // ✅ Ensure data is an array
    } catch (err) {
      setErrorMsgTeams(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(razorpayRecords);

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div>
      {loading && "Loading Teams..."}
      {errorMsgTeams && <div className="py-5">{errorMsgTeams}</div>}

      {!loading && !errorMsgTeams && (
        <MUITable
          type="razorpay"
          read={false}
          update={false}
          deleteitem={false}
          data={razorpayRecords}
          getDatafun={getRecords}
          loading={loading}
          exclude={[
            "FeaturedURL",
            "BannerURL",
            "Artical",
            "$permissions",
            "$createdAt",
            "$updatedAt",
            "$databaseId",
            "$collectionId",
            "card",
            "acquirer_data",
            "notes",
            "upi",
          ]}
        />
      )}
    </div>
  );
};

export default RazorpayRecords;

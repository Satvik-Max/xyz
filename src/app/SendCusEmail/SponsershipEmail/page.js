"use client";
import {
  CustomEmailRes,
  hackathonInvitation,
} from "@/SampleData/GmailTemplate";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { GDGCFilesStorageBucket } from "@/config/appwrite";
import SelectDocumentsModal from "@/components/Modals/SelectDocmentsModal";
import moment from "moment";

const SponsershipEmail = () => {
  const [subjectEmail, setSubjectEmail] = useState("");
  const [jsonData, setJsonData] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [Reports, setReports] = useState("");
  const [filename, setfilename] = useState("");
  const [sendCountSuccess, setsendCountSuccess] = useState(0);
  const [sendCountUnsuccess, setsendCountUnsuccess] = useState(0);
  const [eventdate, seteventdate] = useState("");
  const [emailDelay, setEmailDelay] = useState(5); // Default delay in seconds

  // Handle file upload and convert to JSON
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" }); // Read the file as binary
        const sheetName = workbook.SheetNames[0]; // Get the first sheet name
        const sheet = workbook.Sheets[sheetName]; // Get the sheet data
        const json = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
        setJsonData(json); // Save JSON data to state
      };
      reader.readAsBinaryString(file); // Read the file
    }
  };

  // Add manual entry to jsonData
  const handleAddManualEntry = () => {
    if (!manualName || !manualEmail) {
      toast.error("Please enter Name, Email and Event Date.");
      return;
    }

    const newEntry = { Name: manualName, Email: manualEmail };
    setJsonData((prevData) => [...prevData, newEntry]);
    setManualName("");
    setManualEmail("");
    toast.success("Manual entry added successfully!");
  };

  // Delete a user from jsonData
  const handleDeleteUser = (index) => {
    setJsonData((prevData) => prevData.filter((_, i) => i !== index));
    toast.success("User deleted successfully!");
  };

  // Email template generation
  const htmlTemp = hackathonInvitation(
    "Company Name",
    moment(eventdate).format("ll")
  );

  // Delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Send emails to the list from the uploaded file
  const SendEmails = async () => {
    if (!eventdate || !jsonData || jsonData.length === 0) {
      toast.error("No data available to send emails.");
      return;
    }

    if (emailDelay < 5) {
      toast.error("Minimum delay is 5 seconds.");
      return;
    }

    try {
      setLoading(true);
      for (const [index, user] of jsonData.entries()) {
        try {
          const res = await fetch("/api/SendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.Name,
              email: user.Email,
              message: hackathonInvitation(
                user.Name,
                moment(eventdate).format("ll")
              ),
              subject: `${subjectEmail}`,
              attachments: filename
                ? [
                    {
                      filename: filename,
                      path: Reports,
                    },
                  ]
                : [],
            }),
          });

          if (res.ok) {
            toast.success(`${user.Name} - Email sent successfully!`);
            setsendCountSuccess((prev) => prev + 1);
          } else {
            const errorMessage = await res.text();
            setsendCountUnsuccess((prev) => prev + 1);
            toast.error(`${user.Name} - Failed to send email: ${errorMessage}`);
          }
        } catch (error) {
          console.error(
            `Error sending email to ${user.Name}: ${error.message}`
          );
          toast.error(`Error sending email to ${user.Name}: ${error.message}`);
        }

        // Delay based on the user input
        await delay(emailDelay * 1000);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(`Error sending emails: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Download email template file
  const handleDownload = () => {
    const filePath = "/EmailTemplate.xlsx";
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "EmailTemplate.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <h1 className="font-semibold text-xl">Bulk Email Sender</h1>
        <button
          onClick={SendEmails}
          className="bg-blue-500 font-semibold p-2 px-5 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Emails"}
        </button>
      </div>

      <div className="flex md:flex-row flex-col gap-5">
        {/* Form Section */}
        <div className="w-full">
          <form className="flex flex-col gap-5">
            <div className="flex gap-5">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
                className="w-full border border-gray-300 p-2 rounded-md outline-none"
              />
              <button
                type="button"
                onClick={handleDownload}
                className="w-full bg-red-500 font-semibold text-white p-2 rounded-md"
              >
                Download Template
              </button>
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={subjectEmail}
              onChange={(e) => setSubjectEmail(e.target.value)}
              className="w-full border border-red-500 p-2 rounded-md outline-none"
            />
            <div className="flex gap-2 md:gap-5">
              <div className="flex flex-col gap-2 w-full">
                <p>Event Date</p>
                <input
                  type="date"
                  placeholder="Date"
                  value={eventdate}
                  onChange={(e) => seteventdate(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <p>Delay (s)</p>
                <input
                  type="number"
                  min="5"
                  value={emailDelay}
                  onChange={(e) => setEmailDelay(Number(e.target.value))}
                  placeholder="Delay in seconds (min 5)"
                  className="w-full border border-gray-300 p-2 rounded-md outline-none"
                />
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-5 mt-5">
              <input
                type="text"
                placeholder="Name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md outline-none"
              />
              <button
                type="button"
                onClick={handleAddManualEntry}
                className="bg-green-500 w-full font-semibold text-white p-2 rounded-md"
              >
                Add Entry
              </button>
            </div>

            <div className="flex gap-5">
              <SelectDocumentsModal
                open={true}
                setSelect={setReports}
                name="Select_Attachment"
                Reports={true}
                BucketID={GDGCFilesStorageBucket}
              />
              <p className="font-semibold">{Reports}</p>
            </div>
            <input
              type="text"
              value={filename}
              placeholder="Filename Ex. broucher.pdf"
              onChange={(e) => setfilename(e.target.value)}
              className=" border border-gray-300 p-2 rounded-md outline-none"
            />
          </form>

          <div className="py-2 flex">
            Success: {sendCountSuccess} Failed: {sendCountUnsuccess}
          </div>

          <div className="w-full overflow-scroll">
            {jsonData && jsonData.length > 0 && (
              <table className="w-full border  border-gray-300 mt-5">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Sr. No.</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jsonData.map((user, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {user.Name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {user.Email}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => handleDeleteUser(index)}
                          className="bg-red-500 text-white p-1 px-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full flex-col flex gap-2">
          <h2 className="font-semibold">Preview</h2>
          {subjectEmail && (
            <div className="border border-gray-300 p-5 rounded-md">
              <span className="font-semibold">Subject :</span> {subjectEmail}{" "}
            </div>
          )}
          <div
          className="border border-gray-300 p-5 rounded-md"

            dangerouslySetInnerHTML={{
              __html: htmlTemp,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SponsershipEmail;

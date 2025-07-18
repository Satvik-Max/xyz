"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";
import { ArrowRight, UserRoundPlus } from "lucide-react";
import { useHackOn } from "@/Context/HackOnContext";
import { useAppWrite } from "@/Context/AppWriteContext";
import {
  HackOnMembersCollection,
  HackOnTeamsCollection,
} from "@/config/appwrite";
import { HackOnRegConfirmed } from "@/SampleData/GmailTemplate";
const AddNewTeam = () => {
  const {
    teamName,
    setTeamName,
    leader,
    setLeader,
    members,
    setMembers,
    newMember,
    setNewMember,
    TeamsDetails,
    getHackOnTeams,
  } = useHackOn();
  const { AddDataToCollection } = useAppWrite();
  const [loading, setloading] = useState(false);
  const [paymentID, setpaymentID] = useState("");
  const [amount, setamount] = useState("");
  const [coupons, setcoupons] = useState("");

  // Function to add a team member
  const addMember = (e) => {
    e.preventDefault();
    if (members.length >= 3) {
      toast.error("You can add a maximum of 3 members!");
      return;
    }
    if (newMember.phoneNo.length != 10) {
      return toast.error("Phone No must be 10 digit!");
    }
    if (!newMember.name || !newMember.email || !newMember.phoneNo) {
      toast.error("Please fill in all member details!");
      return;
    }
    setMembers([...members, newMember]);
    setNewMember({ name: "", email: "", phoneNo: "" });
    toast.success("Member added successfully!");
  };
  // Function to delete a member
  const deleteMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
    toast.success("Member removed!");
  };
  // Function to send form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      if (leader.phnumber.length != 10) {
        return toast.error("Phone No must be 10 digit!");
      }
      if (
        !teamName ||
        !leader.name ||
        !leader.email ||
        !leader.phnumber ||
        !leader.college ||
        !leader.department ||
        !leader.college
      ) {
        toast.error("Fill all the fields!");
        return;
      }
      if (members.length < 1) {
        toast.error("You must add at least 1 team members!");
        return;
      }

      const resHacON = await AddDataToCollection(HackOnTeamsCollection, {
        TeamName: TeamsDetails?.teamName,
        LName: TeamsDetails.leader?.name,
        LEmail: TeamsDetails.leader?.email,
        LCollege: TeamsDetails.leader?.college,
        LYear: TeamsDetails.leader?.year,
        LPhoneNo: TeamsDetails.leader?.phnumber,
        LDepartment: TeamsDetails.leader?.department,
        PaymentID: paymentID,
        Amount: `${Math.round(amount - (amount / 100) * 2)}`,
        Coupons: coupons,
      });

      await AddDataToCollection(HackOnMembersCollection, {
        Name: TeamsDetails.leader?.name,
        PhNumber: TeamsDetails.leader?.phnumber,
        email: TeamsDetails.leader?.email,
        Role: "Leader",
        hackOnTeams: resHacON.$id,
      });

      await TeamsDetails?.members?.map(async ({ name, phoneNo, email }) => {
        await AddDataToCollection(HackOnMembersCollection, {
          Name: name,
          PhNumber: phoneNo,
          email: email,
          Role: "Member",
          hackOnTeams: resHacON.$id,
        });
      });

      const HTMLDATA = HackOnRegConfirmed(
        TeamsDetails.leader?.name,
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          resHacON.$id
        )}`,
        "Hack on",
        "21st Feb 2025",
        "GCOEN",
        TeamsDetails?.members,
        "Success",
        TeamsDetails.leader,
        paymentID,
        TeamsDetails?.teamName,
        amount
      );

      const resMail = await fetch("/api/SendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: TeamsDetails.leader.name,
          email: TeamsDetails.leader.email,
          message: HTMLDATA,
          subject: "Thank you for Register the Event!",
          attachments: [
            {
              filename: "RuleBook.pdf",
              path: "https://cloud.appwrite.io/v1/storage/buckets/6773765e0004f634a5e5/files/67b52df20006561a2f1e/view?project=677365e100183b7a1198",
            },
          ],
        }),
      });

      if (resMail.ok) {
        setloading(false);
        await resMail.json();
        toast.success("Registration successfully, Check Your Email");
      }
      getHackOnTeams();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  
  return (
    <div className="w-full flex flex-col gap-5 md:w-[100%]">
      <div className="flex gap-2 w-full">
        <TextField
          label="Payment ID"
          className=" w-full border border-[#787878] "
          id="outlined-size-small"
          required={true}
          size="small"
          value={paymentID}
          onChange={(e) => setpaymentID(e.target.value)}
        />
        <TextField
          label="Amount"
          className=" w-full border border-[#787878] "
          id="outlined-size-small"
          required={true}
          size="small"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
        />
        <TextField
          label="Coupons"
          className=" w-full border border-[#787878] "
          id="outlined-size-small"
          required={true}
          size="small"
          value={coupons}
          onChange={(e) => setcoupons(e.target.value)}
        />
      </div>
      <h2 className="font-semibold  text-2xl">Team Details</h2>

      <form className="flex-col flex gap-3">
        <TextField
          label="Team Name"
          className="border border-[#787878] "
          id="outlined-size-small"
          required={true}
          size="small"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <div className="flex-col flex gap-3">
          <h2 className="font-semibold  text-2xl">Leader Details</h2>
          <TextField
            label="Full Name"
            required={true}
            className="border border-[#787878] "
            id="outlined-size-small"
            size="small"
            value={leader.name}
            onChange={(e) => setLeader({ ...leader, name: e.target.value })}
          />

          <TextField
            required={true}
            label="Email"
            className="border border-[#787878] "
            id="outlined-size-small"
            type="email"
            size="small"
            value={leader.email}
            onChange={(e) => setLeader({ ...leader, email: e.target.value })}
          />

          <TextField
            label="College Name"
            className="border border-[#787878] "
            id="outlined-size-small"
            size="small"
            required={true}
            value={leader.college}
            onChange={(e) => setLeader({ ...leader, college: e.target.value })}
          />

          <TextField
            label="Year"
            required={true}
            type="number"
            className="border border-[#787878] "
            id="outlined-size-small"
            size="small"
            inputProps={{ min: 1 }}
            value={leader.year}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && parseInt(value) >= 1) {
                setLeader({ ...leader, year: value });
              }
            }}
          />

          <TextField
            label="Phone Number"
            required={true}
            type="text" // Change type to text to prevent negative values
            className="border border-[#787878] "
            id="outlined-size-small"
            size="small"
            inputProps={{ maxLength: 10 }} // Limit input to 10 digits
            value={leader.phnumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 10) {
                setLeader({ ...leader, phnumber: value });
              }
            }}
          />

          <TextField
            label="Department"
            className="border border-[#787878] "
            id="outlined-size-small"
            size="small"
            required={true}
            value={leader.department}
            onChange={(e) =>
              setLeader({ ...leader, department: e.target.value })
            }
          />
        </div>
        <div className="flex-col border border-[#787878] p-2 md:p-3 rounded-md flex gap-3">
          <h2 className="font-semibold  text-2xl">Team Members Details</h2>
          <div className="flex rounded-md  flex-col gap-3">
            <TextField
              label="Full Name"
              className="border border-[#787878] "
              id="outlined-size-small"
              size="small"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />

            <TextField
              label="Phone Number"
              type="text" // Change type to text to prevent negative values
              className="border border-[#787878] "
              id="outlined-size-small"
              size="small"
              inputProps={{ maxLength: 10 }} // Limit input to 10 digits
              value={newMember.phoneNo}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setNewMember({ ...newMember, phoneNo: e.target.value });
                }
              }}
            />

            <TextField
              label="Email"
              type="email"
              className="border border-[#787878] "
              id="outlined-size-small"
              size="small"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setNewMember({
                    name: "",
                    email: "",
                    phoneNo: "",
                  });
                }}
                className="p-2 border-[#787878] text-red-400 border bg-transparent rounded-md "
              >
                Clear
              </button>
              <button
                onClick={addMember}
                className="p-2  flex border  gap-3 items-center justify-center w-full text-black bg-blue rounded-md "
              >
                <UserRoundPlus />
                Add Member
              </button>
            </div>
          </div>
        </div>
        {members.length > 0 && (
          <div className="overflow-scroll">
            <table className="w-full mt-2 border rounded-xl  border-[#787878]">
              <thead className="">
                <tr className=" rounded-xl border ">
                  <th className="p-2 border-[#787878] border bg-blue">Name</th>
                  <th className="p-2 border-[#787878] border bg-blue">
                    Phone No
                  </th>
                  <th className="p-2 border-[#787878] border bg-blue">Email</th>
                  <th className="p-2 border-[#787878] border bg-blue">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={index} className=" ">
                    <td className="p-2 border-[#787878] border bg-transparent">
                      {member.name}
                    </td>
                    <td className="p-2 border-[#787878] border bg-transparent">
                      {member.phoneNo}
                    </td>
                    <td className="p-2 border-[#787878] border bg-transparent">
                      {member.email}
                    </td>
                    <td className="p-2 border-[#787878] border bg-transparent text-center">
                      <button
                        onClick={() => deleteMember(index)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className=" w-full">
          <button
            type="submit"
            onClick={handleSubmit}
            className=" bg-blue-500 flex gap-2  items-center justify-center text-black w-full text-center p-3 rounded-md   font-semibold"
          >
            {loading ? "Loading..." : "Add Teams"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTeam;

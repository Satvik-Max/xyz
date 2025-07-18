import {
  TeamScoreCollection,
  TeamValidationCollection,
} from "@/config/appwrite";
import { useAppWrite } from "@/Context/AppWriteContext";
import { useAuth } from "@/Context/AuthContext";
import { Query } from "appwrite";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ScoreValidation = ({ TeamID, TeamData }) => {
  const [formData, setFormData] = useState({
    timeManagement: "",
    presentation: "",
    innovation: "",
    impact: "",
    feasibility: "",
    problemSolving: "",
    relevance: "Yes",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const calculateTotal = () => {
    const total =
      (parseInt(formData.timeManagement) || 0) +
      (parseInt(formData.presentation) || 0) +
      (parseInt(formData.innovation) || 0) +
      (parseInt(formData.impact) || 0) +
      (parseInt(formData.feasibility) || 0) +
      (parseInt(formData.problemSolving) || 0);
    return total;
  };
  const { AddDataToCollection, ListCollectionData } = useAppWrite();
  const [loading, setloading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const checkAlreadyValidate = await ListCollectionData(
        TeamValidationCollection,
        [Query.equal("hackOnTeams", TeamID), Query.equal("ScoreBy", user?.name)]
      );

      if (checkAlreadyValidate?.total > 0) {
        throw new Error("Already Evaluated!");
      }
      await AddDataToCollection(TeamValidationCollection, {
        ...formData,
        hackOnTeams: TeamID,
        ScoreBy: user?.name,
        TotalMarks: calculateTotal().toString(),
        TeamName: TeamData?.TeamName,
      });

      toast.success("Score Added");
      return setFormData({
        timeManagement: "",
        presentation: "",
        innovation: "",
        impact: "",
        feasibility: "",
        problemSolving: "",
        relevance: "Yes",
        remark: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  

  return (
    <div className="w-[50%] hidden md:flex flex-col">
      <h2 className="font-semibold text-xl">Score Validation</h2>
      <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
        <div className="mt-2 grid grid-cols-2 gap-5">
          {[
            {
              label: "Time & Resource Management",
              name: "timeManagement",
              max: 5,
            },
            {
              label: "Presentation & Communication",
              name: "presentation",
              max: 10,
            },
            { label: "Innovation & Creativity", name: "innovation", max: 10 },
            { label: "Impact & Practicality", name: "impact", max: 10 },
            { label: "Feasibility", name: "feasibility", max: 5 },
            {
              label: "Adaptability & Problem Solving",
              name: "problemSolving",
              max: 10,
            },
          ].map((item) => (
            <div key={item.name} className="flex-col flex gap-1">
              <p className="text-sm">
                {item.label}
                <br />
                <span className="text-xs text-gray-500">
                  (Max Marks {item.max})
                </span>
              </p>
              <input
                type="number"
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                className="border p-2 outline-none rounded-md w-full"
                max={item.max}
                min={0}
              />
            </div>
          ))}
          <div className="flex-col flex gap-1">
            <p className="text-sm">Relevance to Selected Domain</p>
            <select
              name="relevance"
              value={formData.relevance}
              onChange={handleChange}
              className="border p-2 outline-none rounded-md w-full"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex-col flex gap-1">
            <p className="text-sm">Remark (If Any)</p>
            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="border p-2 outline-none rounded-md w-full"
            />
          </div>
        </div>
        <p>Total: {calculateTotal()}</p>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 disabled:bg-blue-300 bg-blue-500 rounded-md font-semibold text-white"
        >
          {loading ? "Submiting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ScoreValidation;

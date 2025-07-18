"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useAppWrite } from "./AppWriteContext";
import {
  CoupansCollection,
  HackOnMembersCollection,
  HackOnTeamsCollection,
} from "@/config/appwrite";
import { Query } from "appwrite";

const HackOnContext = createContext();

export const HackOnProvider = ({ children }) => {
  const { ListCollectionData } = useAppWrite();
  const [hackOnTeams, setHackOnTeams] = useState([]);
  const [ErrorMsgTeams, setErrorMsgTeams] = useState("");
  const [loadingTeams, setloadingTeams] = useState(false);

  const [hackOnMembers, setHackOnMembers] = useState([]);
  const [ErrorMsgMembers, setErrorMsgMembers] = useState("");
  const [loadingMembers, setloadingMembers] = useState(false);
  const [presenting, setpresenting] = useState({
    loading: false,
    totalTeams: 0,
    totalMembers: 0,
    totalteamPresent: 0,
    totalteamupsent: 0,
  });

  // Teams Details
  const [teamName, setTeamName] = useState("");
  const [leader, setLeader] = useState({
    name: "",
    email: "",
    college: "",
    year: "",
    department: "",
    phnumber: "",
  });
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });

  const getHackOnTeams = async () => {
    try {
      setloadingTeams(true);
      const res = await ListCollectionData(HackOnTeamsCollection, [
        Query.orderDesc("$createdAt"),
        Query.limit(100)
      ]);
      setHackOnTeams(res?.documents);
    } catch (error) {
      setErrorMsgTeams(error.message);
    } finally {
      setloadingTeams(false);
    }
  };

  const getHackOnMembers = async () => {
    try {
      setloadingMembers(true);
      const res = await ListCollectionData(HackOnMembersCollection, [
        Query.orderDesc("$createdAt"),
        Query.limit(300),
      ]);
      setHackOnMembers(res?.documents);
    } catch (error) {
      setErrorMsgMembers(error.message);
    } finally {
      setloadingMembers(false);
    }
  };

  const getCountCollection = async () => {
    setpresenting({
      loading: true,
      totalTeams: 0,
      totalMembers: 0,
      totalteamPresent: 0,
      totalteamupsent: 0,
    });
    const totalteamPresent = await ListCollectionData(HackOnTeamsCollection, [
      Query.equal("isAttend", true),
    ]);
    const totalteam = await ListCollectionData(HackOnTeamsCollection, []);
    const totalteamMembers = await ListCollectionData(
      HackOnMembersCollection,
      []
    );

    const totalteamupsent = await ListCollectionData(HackOnTeamsCollection, [
      Query.equal("isAttend", false),
    ]);
    return setpresenting({
      loading: false,
      totalTeams: totalteam?.total,
      totalMembers: totalteamMembers?.total,
      totalteamPresent: totalteamPresent?.total,
      totalteamupsent: totalteamupsent?.total,
    });
  };

  const [allCoupons, setallCoupons] = useState([]);
  const [laodingCopons, setlaodingCopons] = useState(false);
  const [CoponsErrorMsg, setCoponsErrorMsg] = useState("");
  const getCopons = async () => {
    try {
      setlaodingCopons(true);
      const res = await ListCollectionData(CoupansCollection, [
        Query.orderDesc("$createdAt"),
      ]);
      return setallCoupons(res?.documents);
    } catch (error) {
      return setCoponsErrorMsg(error.message);
    } finally {
      setlaodingCopons(false);
    }
  };

  useEffect(() => {
    getHackOnTeams();
    getHackOnMembers();
    getCountCollection();
    getCopons();
  }, []);

  const contextData = {
    teamName,
    setTeamName,
    leader,
    setLeader,
    members,
    setMembers,
    newMember,
    setNewMember,
    TeamsDetails: {
      teamName,
      leader,
      members,
    },

    getCountCollection,

    hackOnTeams,
    setHackOnTeams,
    ErrorMsgTeams,
    loadingTeams,
    getHackOnTeams,

    hackOnMembers,
    ErrorMsgMembers,
    loadingMembers,
    getHackOnMembers,

    presenting,
    allCoupons,
    getCopons,
    laodingCopons,
    CoponsErrorMsg,
  };

  return (
    <HackOnContext.Provider value={contextData}>
      {children}
    </HackOnContext.Provider>
  );
};

export const useHackOn = () => useContext(HackOnContext);

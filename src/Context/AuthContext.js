"use client";
// context/AuthContext.js

import { createContext, useState, useEffect, useContext } from "react";
import { UserAccount } from "../config/appwrite"; // Ensure you have your Appwrite client configured
import { FullScreenSpinner } from "@/components/Utility/Loaders";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const accountDetails = await UserAccount.get();
      setUser(accountDetails);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await UserAccount.createEmailPasswordSession(email, password);
      const accountDetails = await UserAccount.get();
      const res = setUser(accountDetails);
      console.log(res);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      await UserAccount.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const contextData = {
    user,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <FullScreenSpinner/>:children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

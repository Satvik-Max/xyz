"use client";
// context/StoreContext.js

import { createContext, useState, useEffect, useContext } from "react";
import { UserAccount } from "../config/appwrite";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const contextData = {};

  return (
    <StoreContext.Provider value={contextData}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

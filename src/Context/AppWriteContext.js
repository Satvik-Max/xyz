"use client";
import { AppwriteDatabase, ID, UserAccount, UsersAuth } from "@/config/appwrite";
import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { Permission, Role } from "appwrite";
const AppWriteContext = createContext();

export const AppwriteProvider = ({ children }) => {
  const {user} = useAuth()
  const AddDataToCollection = async (collectionID, data, slug) => {
    try {
      const res = await AppwriteDatabase.createDocument(
        process.env.NEXT_PUBLIC_DATABASEID,
        collectionID,
        slug ? slug : ID.unique(),
        data,
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
          Permission.delete(Role.label(["admin"])),
          Permission.update(Role.label(["admin"])),
        ]
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const ListCollectionData = async (collectionID, queries) => {
    try {
      const res = await AppwriteDatabase.listDocuments(
        process.env.NEXT_PUBLIC_DATABASEID,
        collectionID,
        queries 
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const UpdateSingleDocument = async (docid, collectionID, data) => {
    try {
      const res = await AppwriteDatabase.updateDocument(
        process.env.NEXT_PUBLIC_DATABASEID,
        collectionID,
        docid,
        data
        // ["read("any")"] // permissions (optional)
      );
      return res;
    } catch (error) {
      console.log(error);

      throw new Error(error.message);
    }
  };

  const GetSingleDocument = async (docid, collectionID, queries) => {
    try {
      const res = await AppwriteDatabase.getDocument(
        process.env.NEXT_PUBLIC_DATABASEID,
        collectionID,
        docid,
        queries // [] type
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const DeleteSingleDocument = async (docid, collectionID) => {
    try {
      const res = await AppwriteDatabase.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASEID,
        collectionID,
        docid
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };




  return (
    <AppWriteContext.Provider
      value={{
        AddDataToCollection,
        ListCollectionData,
        GetSingleDocument,
        UpdateSingleDocument,
        DeleteSingleDocument,
      }}
    >
      {children}
    </AppWriteContext.Provider>
  );
};

export const useAppWrite = () => useContext(AppWriteContext);

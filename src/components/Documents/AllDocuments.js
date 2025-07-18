"use client";
import { ID, StorageBucket } from "@/config/appwrite"; // Ensure this imports correctly
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DefaltBtn from "../Utility/DefaltBtn";
import { useAuth } from "@/Context/AuthContext";
import { Permission, Query, Role } from "appwrite";
import DocsControls from "./DocsControls";

const fileTypes = ["JPG", "PNG", "GIF", "SVG", "PDF", "ZIP", "XLSX", "CSV"];
const AllDocuments = ({ isSelect, SetSelect, BucketID }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [appWriteFiles, setAppWriteFiles] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({}); // Object to track loading states for each file
  const [fetching, setfetching] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null); // Track selected file ID
  const { user } = useAuth();
  console.log(appWriteFiles);

  const handleChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const previews = newFiles.map((file) => ({
      name: file.name,
      file: file,
      url: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...previews]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setUploading(true);
    try {
      await Promise.all(
        files.map(async (file) => {
          const response = await StorageBucket.createFile(
            BucketID,
            ID.unique(),
            file.file,

            [
              Permission.read(Role.any()),
              Permission.update(Role.user(user.$id)),
              Permission.delete(Role.user(user.$id)),
              Permission.delete(Role.label(["admin"])),
              Permission.update(Role.label(["admin"])),
            ]
          );
          console.log("Uploaded:", response);
        })
      );
      toast.success("Files uploaded successfully!");
      setFiles([]);
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      setfetching(true);
      const response = await StorageBucket.listFiles(BucketID, [
        Query.orderDesc("$createdAt"),
      ]);
      const fetchedFiles = response.files.map((file) => ({
        id: file.$id,
        name: file.name,
        url: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BucketID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}`,
      }));
      setAppWriteFiles(fetchedFiles);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message);
    } finally {
      setfetching(false);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      setDeleteLoading((prev) => ({ ...prev, [fileId]: true })); // Set loading for specific file
      await StorageBucket.deleteFile(BucketID, fileId);
      toast.success("File deleted successfully!");
      fetchFiles();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting file. Please try again.");
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [fileId]: false })); // Reset loading for specific file
    }
  };

  const handleSelect = (file) => {
    setSelectedFileId(file.id);
    SetSelect(file.url); // Set the selected file URL
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <input
        type="file"
        multiple
        draggable={true}
        accept={fileTypes.map((type) => `.${type.toLowerCase()}`).join(", ")}
        onChange={handleChange}
        className="file:border-dashed file:bg-transparent file:w-full file:h-20 file:border-blue-300 rounded cursor-pointer"
      />

      <div className="grid md:grid-cols-6 grid-cols-2 gap-4 mt-5">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 border border-gray-300 p-3 rounded-sm shadow-sm"
          >
            <img
              src={file.url}
              alt={file.name}
              className="w-32 h-32 object-cover rounded-sm"
            />
            <p className="text-sm text-gray-600">{file.name}</p>
            <button
              className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => removeFile(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <DefaltBtn
        func={uploadFiles}
        name="Upload Files"
        loading={uploading}
        style={`px-4 py-2 text-white ${
          uploading ? "bg-gray-400" : "bg-blue-500"
        } rounded hover:bg-blue-600`}
      />

      <div>
        <p className="font-semibold">All Files</p>
        <p className="text-gray-500">
          {fetching
            ? "Loading..."
            : appWriteFiles.length < 1 && "No files Found"}
        </p>
        <div className="grid md:grid-cols-6 grid-cols-2 gap-4 mt-5">
          {appWriteFiles.map((file) => (
            <div
              key={file.id}
              className={`flex flex-col items-center gap-2 border p-3 rounded-sm shadow-sm ${
                selectedFileId === file.id ? "bg-green-200" : "border-gray-300"
              }`}
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-32 h-32 object-cover rounded-sm"
              />
              <p className="text-sm text-gray-600">{file.name}</p>
              <DocsControls
                file={file}
                deleteLoading={deleteLoading}
                isSelect={isSelect}
                deleteFile={deleteFile}
                handleSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDocuments;

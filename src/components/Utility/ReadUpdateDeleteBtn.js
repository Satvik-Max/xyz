"use client";
import { useAppWrite } from "@/Context/AppWriteContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IconBtnSpinner } from "./Loaders";
import toast from "react-hot-toast";

const ReadUpdateDeleteBtn = ({
  id,
  type,
  collectionID,
  getDatafun,
  read,
  deleteitem,
  update,
}) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const { DeleteSingleDocument } = useAppWrite();
  const DeleteDocment = async () => {
    try {
      setloading(true);
      await DeleteSingleDocument(id, collectionID);
      await getDatafun();
      toast.success("Item Deleted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex gap-2">
      {read && (
        <button className="uil bg-gray-100 p-2 rounded-md hover:bg-gray-200  uil-eye" />
      )}{" "}
      {update && (
        <button
          onClick={() => {
            if (type == "blog") {
              router.push(`/Blogs/UpdateBlog/${id}`);
            } else if (type == "event") {
              router.push(`/Events/UpdateEvent/${id}`);
            }
          }}
          className="uil bg-gray-100 p-2 rounded-md hover:bg-gray-200  uil-edit "
        />
      )}
      {deleteitem && (
        <button
          onClick={DeleteDocment}
          className="bg-gray-100 p-2 rounded-md hover:bg-gray-200   "
        >
          {!loading ? <i className="uil uil-trash" /> : <IconBtnSpinner />}
        </button>
      )}
    </div>
  );
};

export default ReadUpdateDeleteBtn;

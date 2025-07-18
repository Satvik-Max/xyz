import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AllDocuments from "../Documents/AllDocuments";
import AllReportsDocs from "../Documents/AllReportsDocs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function SelectDocumentsModal({
  setSelect,
  name,
  BucketID,
  Reports,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="">
      <p className=" text-gray-400 font-serif">{name}</p>
      <button
        type="button"
        className="bg-blue-500 text-white px-5 py-2 rounded-md mt-2 font-semibold"
        onClick={handleOpen}
      >
        Select
      </button>

      <Modal
        open={open}
        className="grid overflow-scroll place-items-center"
        onClose={handleClose}
      >
        <Box className="bg-white left-0 p-5 overflow-scroll w-full h-screen">
          <button
            type="button"
            className="border text-black fixed right-10 bg-white mb-5 px-5 py-2 rounded-md mt-2 font-semibold text-2xl uil uil-multiply"
            onClick={handleClose}
          />

          {!Reports ? (
            <AllDocuments
              isSelect={true}
              BucketID={BucketID}
              SetSelect={setSelect}
            />
          ) : (
            <AllReportsDocs
              isSelect={true}
              BucketID={BucketID}
              SetSelect={setSelect}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

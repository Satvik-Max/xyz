"use client";
import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { Plus, X } from "lucide-react";
import { useAppWrite } from "@/Context/AppWriteContext";
import { CoupansCollection } from "@/config/appwrite";
import { useHackOn } from "@/Context/HackOnContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function CreateCoupons() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    AssoName: "",
    CoupanCode: "",
    Description: "",
    NoOfEnteries: "",
    Offer: "",
  });

  const { AddDataToCollection } = useAppWrite();
const {getCopons} = useHackOn()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      await AddDataToCollection(CoupansCollection, formData);
      toast.success("Coupon Created Successfully");
      setFormData({
        AssoName: "",
        CoupanCode: "",
        Description: "",
        NoOfEnteries: "",
        Offer: "",
      });
      getCopons()
    } catch (error) {
      toast.error(error.message);
    } finally {
      // handleClose();
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleOpen}
        className="p-2 flex items-center gap-2 rounded-md border border-gray-300 bg-white shadow-md hover:bg-gray-100 transition"
      >
        <Plus size={16} />
        Create Coupon
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Create Coupon</h2>
            <button onClick={handleClose}>
              <X size={20} className="text-gray-500 hover:text-black" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextField
              label="Associate Name"
              name="AssoName"
              value={formData.AssoName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Coupon Code"
              name="CoupanCode"
              value={formData.CoupanCode}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
              multiline
              rows={2}
            />
            <TextField
              label="Number of Entries"
              name="NoOfEnteries"
              type="number"
              value={formData.NoOfEnteries}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  NoOfEnteries: parseInt(e.target.value, 10) || "",
                })
              }
              required
              inputProps={{ min: 1, step: 1 }}
            />
            <TextField
              label="Offer (%)"
              name="Offer"
              value={formData.Offer}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" className="mt-2">
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

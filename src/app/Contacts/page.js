"use client";
import ContactsAll from "@/components/Utility/ContactsAll";
import { useRouter } from "next/navigation";
import React from "react";

const AllUsers = () => {
  const router = useRouter();
  return (
    <div>
      <div className=" border-b pb-2 md:pb-5 flex justify-between items-center ">
        <h2 className="text-base md:text-xl font-semibold">Contacts Us</h2>
      </div>
      <ContactsAll/>
    </div>
  );
};

export default AllUsers;

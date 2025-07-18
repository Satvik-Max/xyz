"use client";
import UsersAll from "@/components/Users/UsersAll";
import DefaltBtn from "@/components/Utility/DefaltBtn";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const router = useRouter();
  return (
    <div>
      <div className=" border-b pb-2 md:pb-5 flex justify-between items-center ">
        <h2 className="text-base md:text-xl font-semibold">All Users</h2>
        <div className="flex gap-2">
          <DefaltBtn
            style="bg-red-500 font-semibold text-white px-5 py-2 rounded-md"
            name="Create User"
            func={() => {
                toast.success("Unavailable");
            //   router.push("/");
            }}
          />
        </div>
      </div>
      <UsersAll />
    </div>
  );
};

export default AllUsers;

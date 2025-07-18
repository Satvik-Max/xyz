import AllCouponsCom from "@/components/Coupans/AllCouponsCom";
import CreateCoupons from "@/components/Modals/CreateCoupons";
import DefaltBtn from "@/components/Utility/DefaltBtn";
import React from "react";

const CoupansCode = () => {
  return (
    <div>
      <div className=" border-b pb-2 md:pb-5 flex justify-between items-center ">
        <h2 className="text-base md:text-xl font-semibold">Coupons & Offers</h2>
        <div className="flex gap-2">
          <CreateCoupons />
        </div>
      </div>

      <AllCouponsCom />
    </div>
  );
};

export default CoupansCode;

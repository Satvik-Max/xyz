import HackOnHeader from "@/components/Hack-On/HackOnHeader";
import HOStats from "@/components/Hack-On/HOStats";
import { HackOnProvider } from "@/Context/HackOnContext";
import React from "react";

const HackOnLayout = ({ children }) => {
  return (
    <HackOnProvider>
      <div className="flex flex-col gap-5">
        <HackOnHeader />
        <HOStats />
        {children}
      </div>
    </HackOnProvider>
  );
};

export default HackOnLayout;

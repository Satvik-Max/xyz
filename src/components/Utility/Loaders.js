import React from "react";

export const FullScreenSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="md:w-14 h-10 w-10 md:h-14 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
};

export const IconBtnSpinner = () => {
  return (
    <div className=" h-3 w-3  border border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  );
};

export const BtnSpinner = () => {
  return (
    <div className=" h-5 w-5  border border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  );
};

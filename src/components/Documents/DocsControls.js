import React from "react";
import DefaltBtn from "../Utility/DefaltBtn";
import toast from "react-hot-toast";

const DocsControls = ({
  file,
  deleteFile,
  deleteLoading,
  isSelect,
  handleSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <DefaltBtn
        func={() => deleteFile(file.id)}
        loading={deleteLoading[file.id] || false}
        // name="Delete"
        style=" uil uil-trash-alt p-1 bg-red-500 text-white w-7 h-7 rounded-md"
      />
      <DefaltBtn
        func={() => {
          const el = document.createElement("textarea");
          el.value = file.url;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          toast.success("Link copied to clipboard!");
        }}
        // name="Copy Link"
        style=" uil uil-copy p-1 bg-gray-100 text-black w-7 h-7 rounded-md"
      />
      <DefaltBtn
        func={() => {
          const a = document.createElement("a");
          a.href = file.url;
          a.download = file.name;
          a.click();
        }}
        // name="Download"
        style=" uil uil-download-alt p-1 bg-gray-100 text-black w-7 h-7 rounded-md"
      />
      {isSelect && (
        <DefaltBtn
          func={() => handleSelect(file)}
          // name="Select"
          style=" uil uil-check-square p-1 bg-gray-100 text-black w-7 h-7 rounded-md"
        />
      )}
    </div>
  );
};

export default DocsControls;

import React from "react";

const DefaltBtn = ({ name, style, func, loading }) => {
  return (
    <button className={style} onClick={func} disabled={loading}>
      {loading ? "Loading..." : name}
    </button>
  );
};

export default DefaltBtn;

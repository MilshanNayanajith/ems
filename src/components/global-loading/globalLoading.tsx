import React from "react";

type Props = {};

const GlobalLoading = (props: Props) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center  bg-black bg-opacity-70">
      <div className="loading-container">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default GlobalLoading;

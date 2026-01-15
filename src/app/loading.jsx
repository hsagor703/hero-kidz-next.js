import Logo from "@/components/layouts/Logo";
import React from "react";

const GlobalLoading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">Loading...</h2>
      <div className="animate-ping">
        <Logo />
      </div>
    </div>
  );
};

export default GlobalLoading;

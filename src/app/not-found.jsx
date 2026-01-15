import Link from "next/link";
import React from "react";
import { BiError } from "react-icons/bi";

const Error404 = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <BiError className="text-primary" size={100} />
      <div className="flex flex-col items-center justify-center space-y-5">
        <h2 className="text-4xl font-bold">Opps Page Not Found</h2>
        <Link href={"/"} className="btn btn-primary btn-outline">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;

"use client"
import { useSession } from "next-auth/react";
import React from "react";

const Test = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <p>form test {JSON.stringify(session)}</p>
    </div>
  );
};

export default Test;

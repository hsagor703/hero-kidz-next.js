"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialButtons = () => {
  const params = useSearchParams();
  console.log(params.get("callbackUrl") || "/");
  const handleSignIn = async () => {
    // later: connect Google Auth (NextAuth / Firebase)
    const result = await signIn("google", {
      // redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    console.log(result);
    if (result.ok) {
      Swal.fire("Success", "Welcome", "success");
    } else {
      Swal.fire("Error", "Something Wrong !!!", "error");
    }
  };
  return (
    <div>
      <button
        onClick={handleSignIn}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition font-medium"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialButtons;

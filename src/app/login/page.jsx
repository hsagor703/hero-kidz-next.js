"use client";

import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // later: connect Google Auth (NextAuth / Firebase)
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-50 to-pink-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="https://i.ibb.co.com/4wxJxdwn/image.png"
            alt="Hero Kidz Logo"
            width={70}
            height={70}
          />
          <h1 className="text-2xl font-bold mt-3 text-gray-800">
            Welcome to Hero Kidz
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to explore fun & educational toys
          </p>
        </div>

        {/* Email login (optional future use) */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          New to Hero Kidz?{" "}
          <Link href={'/register'} className="text-primary font-medium cursor-pointer">
            Create an account
          </Link>
        </p>

         {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

         {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition font-medium"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

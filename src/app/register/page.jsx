"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";
import { postUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // later: connect registration logic (NextAuth / Firebase)
    // console.log("Register data:", formData);
    const result = await postUser(formData);
    if (result.acknowledged) {
      alert("successfull please login");
      router.push("/login");
    }
  };

  const handleGoogleRegister = () => {
    // later: connect Google Auth (NextAuth / Firebase)
    console.log("Google registration clicked");
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
            Join Hero Kidz
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create your account to explore fun & educational toys
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-primary font-medium cursor-pointer"
          >
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Register */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition font-medium"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import SocialButtons from "@/components/buttons/SocialButtons";
export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callback = params.get("callbackUrl") || "/";
  console.log(callback);
  const [formData, setFormData] = useState({
    // name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    //  signIn("credentials", formData)
    // signIn()
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });

    console.log(result);
    if (!result.ok) {
      Swal.fire({
        title: "Email and Password not Match !!! please try google login or register",
        icon: "error",
        draggable: true,
      });
    } else {
      Swal.fire({
        title: "Welcome to Kidz Hub",
        icon: "success",
        draggable: true,
      });
      router.push(callback);
    }
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
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email address"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
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
          <Link
            href={`/register?callbackUrl=${callback}`}
            className="text-primary font-medium cursor-pointer"
          >
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
        <SocialButtons />
      </div>
    </div>
  );
}

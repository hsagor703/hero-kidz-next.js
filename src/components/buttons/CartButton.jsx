"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CartButton = ({ product }) => {
  const isLogin = false;
  const router = useRouter();
  const path = usePathname();
  const handleAddToCart = () => {
    if (isLogin) {
      alert(`add to cart successfully : ${product._id}`);
    } else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };
  return (
    <button onClick={handleAddToCart} className="btn btn-primary btn-outline">
      Add to Cart
    </button>
  );
};

export default CartButton;

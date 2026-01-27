"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = session.status === "authenticated";
  const router = useRouter();
  const path = usePathname();
  const handleAddToCart = async () => {
    setIsLoading(true);
    if (isLogin) {
      const result = await handleCart({ product, inc: true });
      if (result.success) {
        Swal.fire("Added to Cart", product?.title, "success");
      } else {
        Swal.fire("opps", "something worng", "error");
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };
  return (
    <button
      disabled={session.status === "loading" || isLoading}
      onClick={handleAddToCart}
      className="btn w-full btn-primary"
    >
      Add to Cart
    </button>
  );
};

export default CartButton;

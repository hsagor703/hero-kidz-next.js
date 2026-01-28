"use client";

import {
  decreaseItemBD,
  deleteItemFromCart,
  increaseItemBD,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CartItem({ item, removeItem, updateQuantity }) {
  const { image, title, quantity, price, _id } = item;
  const [isLoading, setIsLoading] = useState(false);
  const handleRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemFromCart(_id);
        if (result.success) {
          removeItem(_id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Something Went Wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleIncreaseQuantity = async () => {
    setIsLoading(true);
    const result = await increaseItemBD(_id, quantity);
    if (result.success) {
      Swal.fire("success", "increase quantity", "success");
      updateQuantity(_id, quantity + 1);
    }
    setIsLoading(false);
  };
  const handleDecreaseQuantity = async () => {
    setIsLoading(true);
    const result = await decreaseItemBD(_id, quantity);
    if (result.success) {
      Swal.fire("success", "decrease quantity", "success");
      updateQuantity(_id, quantity - 1);
    }
    setIsLoading(false);
  };
  return (
    <div className="card card-side bg-base-100 shadow-md p-4 flex flex-col sm:flex-row gap-4">
      {/* Image */}
      <div className="relative w-24 h-24">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-gray-500">Price: ৳ {price}</p>

        {/* Quantity Control */}
        <div className="flex items-center gap-3 mt-3">
          <button
            disabled={quantity === 1 || isLoading}
            onClick={() => handleDecreaseQuantity()}
            className="btn btn-sm btn-outline"
          >
            <FaMinus />
          </button>

          <span className="font-semibold text-lg">{quantity}</span>

          <button
            disabled={quantity === 10 || isLoading}
            onClick={() => handleIncreaseQuantity()}
            className="btn btn-sm btn-outline"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-between items-end">
        <p className="font-bold text-lg text-primary">৳ {price * quantity}</p>

        <button
          onClick={() => handleRemove()}
          className="btn btn-sm btn-error btn-outline"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

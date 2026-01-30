"use client";

import { createOrder } from "@/actions/server/Order";
import textarea from "daisyui/components/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const session = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: session?.data?.user?.name || "",
    email: session?.data?.user?.email || "",
    phone: "",
    city: "",
    address: "",
    textarea: "",
  });
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createOrder(form);
    console.log(result.success);
    if (result.success) {
      Swal.fire("success", "Orderd Successfull", "success");
      router.push("/");
    } else {
      Swal.fire("success", "Something Went Wrong❌", "error");
      router.push("/cart");
    }
  };

  if (session.status === "loading") {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title */}
      <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
        Check Out Page
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* LEFT SIDE – Checkout Form */}
        <div className="flex-2">
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Billing Details</h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                value={session?.data?.user?.name}
                // onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
                readOnly
                // readOnly={session && true}
              />

              <input
                type="email"
                name="email"
                value={session?.data?.user?.email}
                // onChange={handleChange}
                placeholder="Email Address"
                className="input input-bordered w-full"
                required
                readOnly
                // readOnly={session && true}
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input input-bordered w-full"
                required
              />

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="input input-bordered w-full"
                required
              />

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="input input-bordered w-full md:col-span-2"
                required
              />

              <textarea
                name="textarea"
                value={form.textarea}
                onChange={handleChange}
                placeholder="Order Notes (optional)"
                className="textarea textarea-bordered md:col-span-2 w-full"
              ></textarea>

              <button type="submit" className="btn btn-primary md:col-span-2">
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE – Order Summary */}
        <div className="flex-1">
          <div className="card bg-base-100 shadow-lg p-6 sticky top-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              Order Summary
            </h3>

            {/* Product List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b pb-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500">
                      Qty: {item.quantity} × ৳{item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ৳ {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Total Price</span>
                <span>৳ {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

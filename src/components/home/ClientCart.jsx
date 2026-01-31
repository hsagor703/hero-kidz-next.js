"use client";
import React, { useMemo, useState } from "react";
import CartItem from "../card/CartItem";
import Link from "next/link";

const ClientCart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);

  console.log(items);
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  return (
    <div>
      <p className="py-3">
        <span className="text-primary font-bold">{items.length}</span> Items
        Found in the Cart
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Cart Items */}
        <div className="flex-3 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item._id.toString()}
              item={item}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* RIGHT: Cart Summary */}
        <div className="flex-1">
          <div className="card bg-base-100 shadow-lg p-4 sticky top-4">
            <h2 className="text-lg font-bold mb-4 text-center">Cart Summary</h2>

            {/* Summary Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm border-b pb-2"
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

            {/* Confirm Button */}
            {items.length === 0 ? (
              <Link href={"/products"} className="btn btn-primary w-full mt-4">
                Added Order
              </Link>
            ) : (
              <Link href={"/checkout"} className="btn btn-primary w-full mt-4">
                Confirm Order
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCart;

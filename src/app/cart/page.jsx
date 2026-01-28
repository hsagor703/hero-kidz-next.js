import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/card/CartItem";
import ClientCart from "@/components/home/ClientCart";
import React from "react";

const CartPage = async () => {
  const cartItem = await getCart();
  const formated = cartItem.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div>
      {/* title */}
      <div>
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
      </div>
      <ClientCart cartItem={formated}></ClientCart>
    </div>
  );
};

export default CartPage;

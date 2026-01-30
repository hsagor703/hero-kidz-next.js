"use server";

import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";
import { sendEmail } from "@/lib/sendEmail";

const { dbConnect, collections } = require("@/lib/dbConnect");

const orderCollection = dbConnect(collections.ORDER);
export const createOrder = async (payload) => {
  console.log(payload);
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  const cart = await getCart();
  if (cart.length === 0) {
    return { success: false };
  }

  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart,
    ...payload,
  };
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  console.log(newOrder, totalPrice);

  const result = await orderCollection.insertOne(newOrder);
  if (Boolean(result.insertedId)) {
    const result = await clearCart();
  }
  // 📧 Send Invoice Email
  await sendEmail({
    to: user.email,
    subject: "Your Order Invoice - Hero Kidz",
    html: orderInvoiceTemplate({
      orderId: result.insertedId.toString(),
      items: cart,
      totalPrice,
    }),
  });

  return {
    success: result.insertedId,
  };
};

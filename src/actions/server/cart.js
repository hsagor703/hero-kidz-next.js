"use server";

import { getServerSession } from "next-auth";

const { dbConnect, collections } = require("@/lib/dbConnect");
const cartCollection = dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession()) || {};
  if (!user) return false;
  //   getcart item user email and productId
  const query = { email: user?.email, productId: product?._id };
  const isExist = await dbConnect(collections.CART).findOne(query);
  if (isExist) {
    // if exist update cart
    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };
    const result = await cartCollection.updateOne(
      query,
      updatedData,
    );
    return { success: Boolean(result.modifiedCount) };
  } else {
    // not exist then add
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product?.title,
      quantity: 1,
      image: product?.image,
      price: product?.price - (product?.price * product?.discount) / 100,
      username:user?.name
    };
    const result = await cartCollection.insertOne(newData)
    return {success:result.acknowledged}
  }
};

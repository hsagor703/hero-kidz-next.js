import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartButton from "../buttons/CartButton";

const ProductCard = ({ product }) => {
  const { title, image, price, discount, ratings, reviews, sold, _id } =
    product;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="w-full  rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 border border-base-300">
      {/* Image */}
      <div className="h-56 w-full overflow-hidden rounded-t-2xl bg-gray-100">
        <Image
          src={image}
          alt={title}
          height={180}
          width={200}
          className="h-full w-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>

        {/* Rating & Sold */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            ⭐ <span className="font-medium">{ratings}</span>
            <span>({reviews} reviews)</span>
          </div>
          <span>{sold} sold</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold ">৳{discountedPrice}</span>
          {discount && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Button */}
       <CartButton product={{...product, _id:_id.toString()}}/>
        <Link href={`/products/${_id}`}>
          <button className="btn btn-primary btn-outline w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

import { getSigleProduct } from "@/actions/server/product";
import CartButton from "@/components/buttons/CartButton";
import React from "react";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = (await getSigleProduct(id)) || {};

  return {
    title: product?.title,
    description:
      "Explore high-quality educational toys from Hero Kidz that make learning fun and engaging for children.",

    openGraph: {
      title: product?.title,
      description:
        "Fun, safe, and educational toys designed to inspire young minds.",
      images: [
        {
          url: "https://i.ibb.co.com/RkLSNwcC/image.png", // product page preview
          width: 1200,
          height: 630,
          alt: "Hero Kidz Product Preview",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      images: ["https://i.ibb.co.com/RkLSNwcC/image.png"],
    },
  };
};

const ProductDetails = async ({ params, onAddToCart }) => {
  const { id } = await params;
  console.log(id);
  const product = await getSigleProduct(id) || {};
  console.log(product);
  if (!product) return null;

  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const finalPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Details Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{bangla}</p>

        {/* Rating */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>⭐ {ratings}</span>
          <span>{reviews} reviews</span>
          <span>{sold} sold</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold ">৳{finalPrice}</span>
          {discount && (
            <>
              <span className="line-through text-gray-400">৳{price}</span>
              <span className="text-green-600 text-sm">{discount}% OFF</span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <CartButton product={product} />
      </div>

      <div className="col-span-full">
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{description}</p>
        </div>

        {/* Info */}
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {info?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Q&A */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Q & A</h3>
          <div className="space-y-2">
            {qna?.map((qa, index) => (
              <div key={index} className="border rounded-lg p-3">
                <p className="font-medium">{qa.question}</p>
                <p className="text-gray-600">{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

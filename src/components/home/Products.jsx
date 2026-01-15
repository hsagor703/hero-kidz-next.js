import React from "react";
// import products from "@/data/toys.json";
import ProductCard from "../card/ProductCard";
import { getProducts } from "@/actions/server/product";
const Products = async () => {
  const products = await getProducts() || [];
  return (
    <div>
      <h2 className="text-4xl font bold text-center mb-10">Our Products</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {products.map((product, i) => (
          <ProductCard key={i} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;

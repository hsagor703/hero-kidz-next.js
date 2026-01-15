import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import React from "react";

const LoaadingPage = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-10">
        {[...Array(9)].map((_, i) => (
          <ProductCardSkeleton key={i}></ProductCardSkeleton>
        ))}
      </div>
    </div>
  );
};

export default LoaadingPage;

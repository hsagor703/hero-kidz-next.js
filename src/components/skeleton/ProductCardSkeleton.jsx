import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white shadow-md animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 w-full rounded-t-2xl bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />

        <div className="flex justify-between">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>

        <div className="h-10 w-full rounded-xl bg-gray-200 mt-4" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

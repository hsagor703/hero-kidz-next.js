import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-96 w-full rounded-2xl bg-gray-200" />

      {/* Details Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />

        <div className="flex gap-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        <div className="h-8 w-32 bg-gray-200 rounded" />
        <div className="h-12 w-40 bg-gray-200 rounded-xl" />

        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;

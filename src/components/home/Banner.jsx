import { banglaFont } from "@/app/layout";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 space-y-5">
        <h2 className={`${banglaFont.className} text-6xl font-bold leading-20`}>
          আপনার শিশুকে দিন একটি{" "}
          <span className="text-primary">সুন্দর ভবিষ্যৎ</span>
        </h2>
        <p>Buy Every Toys Up To 15% Discount</p>
        <button className="btn btn-primary btn-outline">
          Explore Products
        </button>
      </div>
      <div className="flex-1">
        <Image
          alt="banner image"
          src={"/assets/hero.png"}
          height={500}
          width={400}
        />
      </div>
    </div>
  );
};

export default Banner;

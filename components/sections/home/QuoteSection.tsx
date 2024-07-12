"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

const QuoteSection: React.FC<any> = ({ hallInfo }) => {
  return (
    <div className="h-auto" id="quote">
      <div className="relative">
        <div className="relative z-0 h-full w-full">
          <CldImage
            src={hallInfo.quoteBackgroundPhotoUrl}
            alt="Quote Background Photo"
            className="h-full w-svw"
            crop="thumb"
            width={1000}
            height={300}
          />
        </div>
        <div
          className=" uppercase absolute top-0 h-full w-full flex justify-center items-center"
          style={{ fontFamily: "Shango" }}
        >
          <div className="w-full lg:w-1/2 flex flex-col gap-1 lg:gap-4 mt-2 lg:mt-10">
            <h1 className="text-secondary text-xl lg:text-4xl text-center">
              "{hallInfo.quote}"
            </h1>
            <h1 className="text-red-700 text-xl lg:text-3xl text-center">
              - {hallInfo.quoteAuthor}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;

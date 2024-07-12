"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

const HeroSection: React.FC<any> = ({ hallInfo }) => {
  return (
    <div>
      <div className="relative h-screen w-full z-0">
        <CldImage
          src={hallInfo.heroBackgroundPhotoUrl}
          alt="Hero Profile"
          className="h-screen w-svw"
          height={1000}
          width={2000}
          crop="thumb"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      </div>
      <div className="absolute top-0 h-screen w-full gap-5 flex flex-col items-center justify-center">
        <div className="flex w-full justify-center">
          <CldImage
            src={hallInfo.whiteEmblemUrl}
            alt="Emblem White"
            className="hero_emblem"
            width={350}
            height={350}
          />
        </div>
        <div className="flex flex-col gap-10" style={{ fontFamily: "Shango" }}>
          <div className="flex flex-col w-full justify-center">
            <h1 className="text-secondary uppercase text-center text-8xl">
              {hallInfo.title}
            </h1>
            <h2 className="text-secondary uppercase text-center text-4xl">
              {hallInfo.subTitle}
            </h2>
          </div>
          <div className="flex flex-col w-full justify-center">
            {/* <h1 className="text-secondary uppercase text-center text-4xl">
                  {hallInfo.motto}
                </h1> */}
            <h2 className="text-secondary uppercase text-center text-4xl">
              "{hallInfo.englishMotto}!"
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

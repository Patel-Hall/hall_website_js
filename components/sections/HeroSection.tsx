import React from "react";
import Image from "next/image";
import { HeroProfileImage, HallEmblemWhite } from "@/public/assets";

const HeroSection = () => {
  return (
    <div className="h-screen" id="hero">
      <div className="relative h-full z-0">
        <Image
          src={HeroProfileImage}
          alt="Hero Profile"
          className="object-cover w-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 items-center">
        <Image
          src={HallEmblemWhite}
          alt="Emblem White"
          className="hero_emblem"
        />
        <div className="" style={{ fontFamily: "Shango" }}>
          <h1 className="text-secondary uppercase text-center text-9xl">
            Patel
          </h1>
          <h2 className="text-secondary uppercase text-center text-4xl">
            Hall of Residence
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

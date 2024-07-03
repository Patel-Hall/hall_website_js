"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { SocialIcon } from "react-social-icons";

const Footer: React.FC<any> = ({ hallInfo }) => {
  return (
    <div
      className="bg-primary h-auto w-full flex flex-col px-5 pt-5"
      id="footer"
    >
      <div className="m-3 md:m-5 lg:m-10">
        <div className="flex flex-row gap-5">
          <div
            className="hidden md:flex md:flex-col gap-3 w-full items-center"
            style={{ fontFamily: "Shango" }}
          >
            <div>
              <CldImage
                src={hallInfo.whiteEmblemUrl}
                alt="Emblem White"
                className="hero_emblem"
                width={350}
                height={350}
              />
            </div>
            <h1 className="text-secondary text-4xl uppercase">
              {hallInfo.title} {hallInfo.subTitle}
            </h1>
          </div>
          <div className="max-md:hidden h-auto w-[3px] bg-secondary" />
          <div className="flex flex-col w-full items-center gap-5">
            <h1
              className="text-secondary text-3xl md:text-4xl uppercase"
              style={{ fontFamily: "Shango" }}
            >
              Contact Us
            </h1>
            <div
              className="flex flex-col w-5/6 items-start gap-2"
              style={{ fontFamily: "Lato" }}
            >
              <h1 className="text-secondary text-2xl uppercase">Address:</h1>
              <p className="text-secondary text-2xl">{hallInfo.address}</p>
            </div>
            <div
              className="flex flex-col w-5/6 items-start gap-2"
              style={{ fontFamily: "Lato" }}
            >
              <h1 className="text-secondary text-2xl uppercase">Phone:</h1>
              <p className="text-secondary text-2xl">
                Office: {hallInfo.officePhone}
              </p>
              <p className="text-secondary text-2xl">
                Security: {hallInfo.securityPhone}
              </p>
            </div>
            <div className="flex flex-row gap-10">
              {hallInfo.socials.map((social: any, index: string) => {
                return (
                  <SocialIcon
                    key={index}
                    url={social.url}
                    target="_blank"
                    fgColor="#9F212C"
                    bgColor="#FFFDD0"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-2 md:pt-5 text-secondary w-full flex flex-col justify-center items-center text-md md:text-lg lg:text-xl">
          © 2024 {hallInfo.title} {hallInfo.subTitle} All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;

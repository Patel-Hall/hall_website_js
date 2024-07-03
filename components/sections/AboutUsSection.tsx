"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AboutUsSection: React.FC<any> = ({ hallInfo }) => {
  return (
    <div
      className="h-auto bg-secondary flex flex-col lg:flex-row px-7 py-12 gap-10"
      id="about"
    >
      <div
        className="flex flex-col w-auto uppercase"
        style={{ fontFamily: "Shango" }}
      >
        <div className="flex flex-col gap-14 w-full items-center lg:items-start">
          <div className="flex flex-col gap-2">
            <p className="text-primary text-4xl font-bold">About us</p>
            <p className="text-black text-5xl font-bold">
              Patel Hall of Residence
            </p>
          </div>
          <div className="bg-primary w-fit p-2">
            <CldImage
              src={hallInfo.sardarVallabhBhaiPatelPhotoUrl}
              alt="Sardar Vallabh Bhai Patel Photo"
              height={300}
              width={300}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col justify-between gap-4">
        <div
          className="text-black text-2xl flex flex-col gap-3"
          style={{ fontFamily: "Lato" }}
        >
          {hallInfo.aboutUs.split("\n").map((line: string, index: string) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div
          className="uppercase bg-primary h-10 flex justify-center items-center rounded-md"
          style={{ fontFamily: "Shango" }}
        >
          <Link
            href={hallInfo.constitutionDriveLink}
            target="_blank"
            className=" text-secondary text-2xl font-bold px-6 py-2"
          >
            Hall Constitution
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;

"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const [hallInfo, setHallInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchHallInfo = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/getHallInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        setHallInfo(data.hallInfo);
      } else {
        setError(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHallInfo();
  }, []);

  return (
    <div
      className="bg-primary h-auto w-full flex flex-col px-5 pt-5"
      id="footer"
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <p>Error</p>
      ) : (
        <div className="m-10">
          <div className="flex flex-row gap-5">
            <div
              className="flex flex-col gap-3 w-full items-center"
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
            <div className="h-auto w-[3px] bg-secondary" />
            <div className="flex flex-col w-full items-center gap-5">
              <h1
                className="text-secondary text-4xl uppercase"
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
          <div className="pt-5 text-secondary w-full flex flex-col justify-center items-center text-xl">
            © 2024 {hallInfo.title} {hallInfo.subTitle} All Rights Reserved
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;

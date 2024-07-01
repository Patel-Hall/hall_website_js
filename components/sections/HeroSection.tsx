"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

const HeroSection = () => {
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
    <div className="h-screen" id="hero">
      {loading ? (
        <p>Loading..</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <div>
          <div className="relative h-full z-0">
            <CldImage
              src={hallInfo.heroBackgroundPhotoUrl}
              alt="Hero Profile"
              className="object-cover w-full"
              width={2000}
              height={1000}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 items-center">
            <div className="flex w-full justify-center">
              <CldImage
                src={hallInfo.whiteEmblemUrl}
                alt="Emblem White"
                className="hero_emblem"
                width={350}
                height={350}
              />
            </div>
            <div
              className="flex flex-col gap-10"
              style={{ fontFamily: "Shango" }}
            >
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
      )}
    </div>
  );
};

export default HeroSection;

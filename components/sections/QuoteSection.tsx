"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

const QuoteSection = () => {
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
    <div className="h-auto" id="quote">
      {loading ? (
        <p>Loading..</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <div className="relative">
          <div className="relative z-0">
            <CldImage
              src={hallInfo.quoteBackgroundPhotoUrl}
              alt="Quote Background Photo"
              className="object-cover w-full"
              crop="fill"
              width={1000}
              height={300}
            />
          </div>
          <div
            className=" uppercase absolute top-0 h-full w-full flex justify-center items-center"
            style={{ fontFamily: "Shango" }}
          >
            <div className="w-1/2 flex flex-col gap-4 mt-10">
              <h1 className="text-secondary text-4xl text-center">
                "{hallInfo.quote}"
              </h1>
              <h1 className="text-red-700 text-3xl text-center">
                - {hallInfo.quoteAuthor}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteSection;

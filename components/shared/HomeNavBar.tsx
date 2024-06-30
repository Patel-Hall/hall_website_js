"use client";
import React, { useEffect, useState } from "react";
import { HomeNavBarLogo } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";
import { navBarItems } from "@/constants";
import { CldImage } from "next-cloudinary";

const HomeNavBar = () => {
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
    <nav className="bg-primary text-secondary fixed z-30 flex flex-row w-full items-center justify-between px-6 py-3 opacity-75">
      <Link href="/" className="flex items-center justify-start mx-10">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error</p>
        ) : (
          <CldImage
            src={hallInfo.logoUrl}
            alt="home-logo"
            height={50}
            width={166}
          />
        )}
      </Link>
      <div
        className="flex flex-1 justify-end gap-24 mx-10"
        style={{ fontFamily: "Shango" }}
      >
        {navBarItems.map((link, index) => {
          return (
            <div key={index} className="flex-col text-lg">
              <Link href="/" className="no-underline uppercase flex-col">
                <p>{link}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default HomeNavBar;

"use client";
import React, { useEffect, useState } from "react";
import {
  HeroSection,
  HomeNavBar,
  AboutUsSection,
  QuoteSection,
  NotableAlumniSection,
  Footer,
} from "@/components";

export default function Home() {
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <div>
          <HomeNavBar hallInfo={hallInfo} />
          <HeroSection hallInfo={hallInfo} />
          <AboutUsSection hallInfo={hallInfo} />
          <QuoteSection hallInfo={hallInfo} />
          <NotableAlumniSection hallInfo={hallInfo} />
          <Footer hallInfo={hallInfo} />
        </div>
      )}
    </div>
  );
}

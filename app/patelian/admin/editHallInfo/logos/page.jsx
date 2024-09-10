"use client";
import React, { useEffect, useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const page = () => {
  const [hallInfo, setHallInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleUpload = async (type, url) => {
    try {
      const res = await fetch("/api/updateHallInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: type, value: url }),
      });

      if (res.ok) {
        fetchHallInfo();
      } else {
        console.log(res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-secondary">
      Edit Logos
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error encountered: {error}</p>
        ) : (
          <div className="flex flex-row gap-10 mx-5 mt-5">
            <div>
              <div className="bg-primary py-3 px-2">
                <CldImage
                  src={hallInfo.logoUrl}
                  alt="Website Logo"
                  width={100}
                  height={50}
                />
              </div>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) =>
                  handleUpload("logoUrl", result?.info?.public_id)
                }
              >
                {({ open }) => {
                  return <button onClick={() => open()}>Upload Logo</button>;
                }}
              </CldUploadWidget>
            </div>
            <div>
              <div className="bg-primary py-3 px-2">
                <CldImage
                  src={hallInfo.dragonLogoUrl}
                  alt="Website Dragon Logo"
                  width={100}
                  height={50}
                />
              </div>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) =>
                  handleUpload("dragonLogoUrl", result?.info?.public_id)
                }
              >
                {({ open }) => {
                  return (
                    <button onClick={() => open()}>Upload Dragon Logo</button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

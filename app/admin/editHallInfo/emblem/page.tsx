"use client";
import React, { useEffect, useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const page = () => {
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

  const handleUpload = async (type: string, url: string) => {
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
      Edit Emblem
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
                  src={hallInfo.emblemUrl}
                  alt="Hall Emblem Coloured"
                  width={100}
                  height={50}
                />
              </div>
              <CldUploadWidget
                uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) =>
                  handleUpload("emblemUrl", result?.info?.public_id)
                }
              >
                {({ open }) => {
                  return <button onClick={() => open()}>Upload Emblem</button>;
                }}
              </CldUploadWidget>
            </div>
            <div>
              <div className="bg-primary py-3 px-2">
                <CldImage
                  src={hallInfo.whiteEmblemUrl}
                  alt="Hall White Emblem"
                  width={300}
                  height={100}
                />
              </div>
              <CldUploadWidget
                uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) =>
                  handleUpload("whiteEmblemUrl", result?.info?.public_id)
                }
              >
                {({ open }) => {
                  return (
                    <button onClick={() => open()}>Upload White Emblem</button>
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

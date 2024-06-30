"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";

const page = () => {
  const [hallInfo, setHallInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [about, setAbout] = useState("");
  const [url, setUrl] = useState("");

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
        setAbout(data.hallInfo.aboutUs);
        setUrl(data.hallInfo.constitutionDriveLink);
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

  const handleUpload = async (type: string, value: string) => {
    try {
      const res = await fetch("/api/updateHallInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: type, value: value }),
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!about || !url) {
      setError("All fields are required.");
      return;
    }

    const aboutWithNewlines = about.replace(/\r?\n/g, "\n");

    await handleUpload("aboutUs", aboutWithNewlines);
    await handleUpload("constitutionDriveLink", url);
  };

  return (
    <div className="h-screen bg-secondary">
      Edit About
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
                  src={hallInfo.sardarVallabhBhaiPatelPhotoUrl}
                  alt="Sardar Vallabh Bhai Patel Photo"
                  className="w-auto"
                  width={200}
                  height={200}
                />
              </div>
              <CldUploadWidget
                uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) =>
                  handleUpload(
                    "sardarVallabhBhaiPatelPhotoUrl",
                    result?.info?.public_id
                  )
                }
              >
                {({ open }) => {
                  return <button onClick={() => open()}>Upload Photo</button>;
                }}
              </CldUploadWidget>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="form_input my-5 w-full"
                placeholder="About Us"
              />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="form_input my-5 w-full"
                type="text"
                placeholder="Constitution Drive Link"
              />
              <button className="bg-primary text-secondary font-bold px-6 py-2">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

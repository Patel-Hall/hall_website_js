"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";

const page = () => {
  const [hallInfo, setHallInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

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
        setQuote(data.hallInfo.quote);
        setAuthor(data.hallInfo.quoteAuthor);
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
      } else {
        console.log(res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!quote || !author) {
      setError("All fields are required.");
      return;
    }

    await handleUpload("quote", quote);
    await handleUpload("quoteAuthor", author);
    fetchHallInfo();
  };

  return (
    <div className="h-full min-h-screen bg-secondary">
      Edit About
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error encountered: {error}</p>
        ) : (
          <div className="flex flex-col gap-10 mx-5 mt-5">
            <div>
              <div className="py-3 px-2">
                <CldImage
                  src={hallInfo.quoteBackgroundPhotoUrl}
                  alt="Quote Background Photo"
                  width={800}
                  height={600}
                />
              </div>
              <CldUploadWidget
                uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) =>
                  handleUpload(
                    "quoteBackgroundPhotoUrl",
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
              <input
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="form_input my-5 w-full"
                placeholder="Quote"
              />
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="form_input my-5 w-full"
                type="text"
                placeholder="Author"
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

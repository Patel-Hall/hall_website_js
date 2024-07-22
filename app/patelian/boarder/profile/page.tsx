"use client";
import { UserProfileCard } from "@/components";
import { emptyProfileImageUrl } from "@/public/variables";
import { signOut, useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const { data: session } = useSession();
  const [patelian, setPatelian] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getUserDetails();
  }, [session]);

  const getUserDetails = async () => {
    console.log(session?.user?.email);
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      const data = await response.json();
      console.log(data.patelian.instiEmail);

      if (response.ok) {
        setPatelian(data.patelian);
        setError("");
      } else {
        setError(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen bg-secondary flex flex-col items-center justify-center">
      <UserProfileCard />
      <Link
        href={"/patelian/boarder/profile/edit"}
        className="bg-primary text-center p-2 mt-2"
      >
        Edit Profile
      </Link>
      <button onClick={logoutUser} className="bg-primary px-6 py-2 mt-2">
        Log out
      </button>
    </div>
  );
};

export default page;

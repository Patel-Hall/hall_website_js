"use client";
import { AuthRoute } from "@/components";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data } = useSession();

  const logoutUser = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-secondary">
      Welcome, HCM!
      <div>Name: {session?.user?.name}</div>
      <Link href={"/patelian/profile"} className="bg-primary px-6 py-2 mt-2">
        Profile
      </Link>
      <button onClick={logoutUser} className="bg-primary px-6 py-2 mt-2">
        Log out
      </button>
    </div>
  );
};

export default page;

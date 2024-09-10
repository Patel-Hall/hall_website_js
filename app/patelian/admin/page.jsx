"use client";
import { AuthRoute } from "@/components";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  const logoutUser = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center">
      <h1>Logged into Patel Hall of Residence Admin Panel</h1>
      <h2>Name: {session && session.user ? session.user.name : ''}</h2>
      <h2>Email: {session && session.user ? session.user.email : ''}</h2>
      <Link
        href={"/patelian/admin/editHallInfo"}
        className="bg-primary px-6 py-2 mt-2"
      >
        Edit Hall Information
      </Link>
      <Link
        href={"/patelian/admin/users"}
        className="bg-primary px-6 py-2 mt-2"
      >
        Check users
      </Link>
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


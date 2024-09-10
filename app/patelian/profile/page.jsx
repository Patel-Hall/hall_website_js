"use client";
import { UserProfileCard } from "@/components";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const page = () => {
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
        href={"/patelian/profile/edit"}
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

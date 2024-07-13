"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const { data: session } = useSession();
  if (!session) redirect("/patelian/login");

  if (session?.user?.role !== "Tech Team") redirect("/patelian");

  const logoutUser = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Welcome, Tech Team Member!
      <div>Name: {session?.user?.name}</div>
      <button onClick={logoutUser} className="bg-primary px-6 py-2 mt-2">
        Log out
      </button>
    </div>
  );
};

export default page;

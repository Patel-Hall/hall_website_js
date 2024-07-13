"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  if (session === null) redirect("/patelian/login");

  if (session?.user?.role === "Boarder") redirect("/patelian/boarder");
  if (session?.user?.role === "Alumnus") redirect("/patelian/alumnus");
  if (session?.user?.role === "Admin") redirect("/patelian/admin");
  if (session?.user?.role === "HCM") redirect("/patelian/hcm");
  if (session?.user?.role === "Tech Team") redirect("/patelian/techTeam");

  const logoutUser = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Patelian Page with {session?.user?.name} and email {session?.user?.email}{" "}
      and role {session?.user?.role}
      <button onClick={logoutUser} className="bg-primary px-6 py-2 mt-2">
        Log out
      </button>
    </div>
  );
};

export default page;

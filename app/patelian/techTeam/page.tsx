"use client";
import { AuthRoute } from "@/components";
import { signOut, useSession } from "next-auth/react";
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
    <AuthRoute roles={["Tech Team"]}>
      <div>
        Welcome, Tech Team Member!
        <div>Name: {session?.user?.name}</div>
        <button onClick={logoutUser} className="bg-primary px-6 py-2 mt-2">
          Log out
        </button>
      </div>
    </AuthRoute>
  );
};

export default page;

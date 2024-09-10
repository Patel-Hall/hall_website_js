"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const AuthRoute = ({ children, roles }) => {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      redirect("/patelian/login");
    } else if (roles && !roles.some((role) => session?.user?.role === role)) {
      redirect("/patelian/unauthorized");
    }
  }, [status, session, roles]);

  return children;
};

export default AuthRoute;


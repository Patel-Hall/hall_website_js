"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.push("/patelian");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 border-primary border-4 bg-white grid place-items-center shadow-lg rounded-lg">
      <h1 className="text-xl font-bold my-4 text-black">Patelian Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="login_form_input"
          type="email"
          placeholder="Email"
        />
        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="login_form_input"
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          <span
            className="absolute top-1/4 right-2 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
          </span>
        </div>
        <button className="bg-primary text-secondary font-bold px-6 py-2">
          Login
        </button>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 roudn mt-2">
            {error}
          </div>
        )}

        <div className="text-sm mt-3 text-right">
          Don't have an account?{" "}
          <span className="underline">
            <Link href={"/patelian/register"}>Register.</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

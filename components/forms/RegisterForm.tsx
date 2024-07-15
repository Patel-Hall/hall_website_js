"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instiEmail, setInstiEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const loginUser = async () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      setError("Please Enter All Required Fields!");
      return;
    }

    if (password !== password2) {
      setError("Passwords don't match");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists!");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, instiEmail, rollNo, password }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        setError("");
        loginUser();
      } else {
        console.log("Patelian Registration Failed with error:", res.json());
      }
    } catch (err) {
      console.log("Error during registration:", err);
    }
  };

  return (
    <div className="p-10 border-primary border-4 bg-white grid place-items-center shadow-lg rounded-lg">
      <h1 className="text-xl font-bold my-4 text-black">Patelian Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setName(e.target.value)}
          className="login_form_input"
          type="text"
          placeholder="Full Name*"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="login_form_input"
          type="email"
          placeholder="Email*"
        />
        <input
          onChange={(e) => setInstiEmail(e.target.value)}
          className="login_form_input"
          type="email"
          placeholder="Institute Email"
        />
        <input
          onChange={(e) => setRollNo(e.target.value)}
          className="login_form_input"
          type="text"
          placeholder="Roll No"
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
        <div className="relative">
          <input
            onChange={(e) => setPassword2(e.target.value)}
            className="login_form_input"
            type={showPass2 ? "text" : "password"}
            placeholder="Re-enter Password*"
          />
          <span
            className="absolute top-1/4 right-2 cursor-pointer"
            onClick={() => setShowPass2(!showPass2)}
          >
            <FontAwesomeIcon icon={showPass2 ? faEyeSlash : faEye} />
          </span>
        </div>

        <button className="bg-primary text-secondary font-bold px-6 py-2">
          Register
        </button>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 round mt-2">
            {error}
          </div>
        )}

        <div className="text-sm mt-3 text-right">
          Already have an account?{" "}
          <span className="underline">
            <Link href={"/patelian/login"}>Login.</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

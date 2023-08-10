"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Loader from "../loader";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("Login success", response.data);
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[800px] lg:w-[900px] h-[564px] rounded-[10px] flex bg-white shadow-lg">
        <Image
          src="/Rectangle.png"
          width={450}
          height={564}
          alt="login"
          className=" rounded-s-[10px]"
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-[410px] p-10">
            <h1 className="text-[48px] leading-[55px] mb-2">Login</h1>
            <hr className="h-[3px] bg-slate-600" />
            <div className="mt-4">
              <label htmlFor="email" className="font-mono">
                Email
              </label>
              <input
                id="email"
                type="text"
                autoComplete="off"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full block py-2 px-5 border border-neutral-300 rounded"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="font-mono">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full block py-2 px-5 border border-neutral-300 rounded"
              />
            </div>
            <div>
              <p className="text-right text-[14px] leading-[21px] text-neutral-600 font-semibold mt-5">
                Forgot password?
              </p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={onLogin}
                className=" bg-green-600 text-white py-1 px-4 rounded-sm font-mono"
              >
                {btnDisabled ? "Fill the fields" : "Login"}
              </button>
            </div>
            <div className="mt-4">
              <Link
                href="/signup"
                className="font-mono text-xs tracking-tight cursor-pointer text-blue-500"
              >
                visit to signup page &#8594;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  
  const logout = async () => {
    try {
      const logout = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    // console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="w-full h-screen p-2">
      <div className="card w-[480px] h-[600px] shadow-lg mx-auto text-center p-2">
        <h1 className="text-2xl font-mono">Profile</h1>
        <div className="w-[70px] h-[70px] bg-[#8dc572] rounded-full mx-auto mt-4"></div>
        <p className="mt-2">Jonh Doe</p>
        <button
          onClick={logout}
          className="bg-[#dc143c] mt-4 hover:bg-[#be0b2f] text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        <hr />
        <button
          onClick={getUserDetails}
          className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          GetUser Details
        </button>
        <h2 className="p-1 rounded bg-green-500 mt-4">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
      </div>
    </div>
  );
}

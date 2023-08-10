"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('api/users/verifyemail', {token});
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])
    
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return(
        <div className="w-full h-screen text-center p-8">
            <h1 className="text-3xl">Verify Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>
            {verified && (
                <div>
                    <h2 className="text-green-500">Email verified</h2>
                    <button className="py-1 px-4 bg-slate-400 rounded">
                        <Link href='/login'>Login</Link>
                    </button>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-[#dc143c]">Error</h2>
                </div>
            )}
        </div>
    )
}
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  // ✅ Correct way to get dynamic route param
  const email = decodeURIComponent(params.email);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [verification, setverification] = useState(false)

  useEffect(() => {
    // ✅ Validate email properly after render
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError(true);
      toast.error("Invalid or missing email.");
      router.push("/signup");
    }
  }, [email, router]);

  // ✅ OTP verification
  const verify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("OTP verified successfully!");
        setverification(true)
        setTimeout(() => router.push(`/signup/password?email=${encodeURIComponent(email)}`)
, 1500);
      } else {
        toast.error(data.error || "OTP verification failed. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("OTP verification error:", err);
    }
  };

  if (error) return null; // ✅ Avoid rendering the form if invalid email

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ToastContainer position="bottom-right" />
      <p className="w-[80%] md:w-[50%] text-lg text-center mt-10">
        <span className="text-black font-bold">{email}</span> is your email.
        Please check your inbox — we have sent you an OTP. Enter it below to
        verify your email address.
      </p>

      <form
        onSubmit={verify}
        className="mt-10 w-full flex flex-col gap-6 justify-center items-center"
      >
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-[80%] md:w-[60%] text-black rounded-lg border p-2 outline-gray-800 focus:outline-black outline-2"
        />
       
          <button
  disabled={verification}
  type="submit"
  className={`bg-black px-2 py-1 rounded-full ${verification ? "opacity-60 cursor-not-allowed" : ""}`}
>Submit</button>
      </form>
    </div>
  );
}

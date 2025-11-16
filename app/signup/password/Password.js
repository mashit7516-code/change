"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verification, setVerification] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  // ✅ Check verification status
  useEffect(() => {
    const checkVerified = async () => {
      try {
        console.log("Checking verification for:", email);
        const res = await fetch("/api/auth/check-verified", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (!data.success) {
          toast.error("Verification check failed. Try again later.");
          return;
        }
        if (!data.verified) {
          toast.error("Please verify your email first.");
          router.push(`/signup/verify/${encodeURIComponent(email)}`);
        }
      } catch (err) {
        console.error("Error checking verification:", err);
        toast.error("Something went wrong.");
      }
    };

    if (email) checkVerified();
    else toast.error("Email not found in URL");
  }, [email, router]);

  // ✅ Handle submit
  const handleSubmit = async () => {
    setError(false);
    setMessage("");

    if (password !== confirmPassword) {
      setError(true);
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password set successfully!");
        setVerification(true);
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(true);
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(true);
      setMessage("Server error");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      <div className="text-3xl font-bold mt-40 mb-8">Set up a Password</div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col w-full items-center"
      >
        {/* Create Password */}
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <span className="font-semibold text-xl">Create Password</span>
          <div className="relative w-[70%] md:w-[50%]">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full border-2 text-black border-black rounded-lg p-2 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer select-none"
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col justify-center items-center gap-2 w-full mt-4">
          <span className="font-semibold text-xl">Confirm Password</span>
          <div className="relative w-[70%] md:w-[50%]">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="w-full border-2 text-black border-black rounded-lg p-2 pr-10"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your Password"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer select-none"
            >
              {showConfirmPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={verification}
          onClick={handleSubmit}
          type="submit"
          className={`bg-black text-white px-4 py-2 rounded-full mt-6 ${
            verification ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {
            verification ? <span>Generating Account</span> : <span>Submit</span>
          }
        </button>

        {error && (
          <div className="text-red-500 mt-3 font-medium text-center">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Password;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import LoginForm from "@/components/Auth/LoginForm";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({ user: { email, password } }),
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("LOGIN SUCCESS");
        router.push("/dashboard");
      } else {
        setError("No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      loading={loading}   
      error={error}       
      setError={setError} 
    />
  );
}
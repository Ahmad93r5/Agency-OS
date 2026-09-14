"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import SignupForm from "@/components/Auth/SignupForm";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest("/signup", {
        method: "POST",
        body: JSON.stringify({
          user: { name, email, password },
        }),
      });

      console.log("Signup successful:", response);
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupForm
      name={name}
      setName={setName}
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
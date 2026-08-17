"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/Auth/SignupForm";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name,
          email,
          password,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong... Signup Failed");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Signup successful:", data);
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <SignupForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}
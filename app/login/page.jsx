"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Login() {

const router = useRouter();  // Initialize the router for navigation
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");



function handleSubmit(e) {
  e.preventDefault();   
   fetch("http://localhost:3001/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: {
      email,
      password,
    },
  }),
})
.then((response) => response.json())
.then((data) => {
localStorage.setItem("token", data.token);
  console.log("LOGIN SUCCESS");
router.push("/dashboard");
})
.catch((error) => {
  console.error("Error:", error);
});

}



 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8">

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Login
        </button>

      </form>

      <p className="text-center mt-5 text-sm text-gray-600">
        Dont have an account?{" "}
        <Link
          href="/signup"
          className="text-gray-900 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>

    </div>
  </div>
);
}
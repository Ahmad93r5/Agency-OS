"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
 .then(response => {
   if(!response.ok) {
    throw new Error("Something wet Wrong...Signup Failed")
   }

   return response.json(); })
 .then(data => {
   console.log("Signup successful:", data);
   router.push("/login");  
 });

 }

 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8">

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Create your account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            required
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

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
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm  font-medium text-gray-700 mb-1"
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
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 cursor-pointer text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Sign up
        </button>

      </form>

      <div className="text-center mt-5 text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-gray-900 font-medium hover:underline"
        >
          Login
        </Link>
      </div>

    </div>
  </div>
);
}
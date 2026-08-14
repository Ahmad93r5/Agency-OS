"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";




export default function Dashboard() {

const router = useRouter();  

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}, [router]); //“React, is useEffect ke andar router use ho raha hai. Agar router ki value change ho, to effect dobara chala dena.”

// for logout functionality & remove token from local storage
function handleLogout() {
  localStorage.removeItem("token");
  router.push("/login");
}


 return (
    
  
  <div className="min-h-screen bg-gray-100">

    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Logout
        </button>

      </div>
    </header>
    

    <main className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome to the dashboard!
      </h2>

      <p className="mt-2 text-gray-600">
        Manage your workspaces and projects from here.
      </p>

    </main>

  </div>
);
}
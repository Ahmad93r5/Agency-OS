"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

export default function DashboardLayout({ children }) {

   const [user, setUser] = useState(null);

   useEffect(() => {
          
    const fetchUser = async () => {
      try {
        const data = await apiRequest("/users");
        setUser(data.user);
      }
      catch (error) {
        console.error("failed to fetch user", error);
      } 
    }

    fetchUser();
   }, []); 
 



  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
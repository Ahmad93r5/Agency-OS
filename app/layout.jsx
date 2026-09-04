"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";   // ✅ Navbar import

export default function RootLayout({ children }) {
 
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
    <html lang="en">
      <body className="flex min-h-screen">
        {/* ✅ Sidebar fixed */}
        <Sidebar />

        {/* ✅ Right side: Navbar + Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar  user={user} />                         {/* ✅ Navbar top pe */}
          <main className="flex-1 p-8 bg-gray-100">
            {children}                       {/* ✅ Content change */}
          </main>
        </div>
      </body>
    </html>
  );
}

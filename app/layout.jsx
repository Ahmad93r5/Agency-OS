"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { apiRequest } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  //  Auth pages check karo
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token || isAuthPage) return;

      try {
        const data = await apiRequest("/users");
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [isAuthPage]);

  //  Auth pages pe sirf children show karo (Sidebar/Navbar nahi)
  if (isAuthPage) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        {/*  flex direction: mobile pe column? No — sidebar fixed overlay hai, 
            toh mobile pe bhi row hi rehta hai */}
        <div className="flex h-screen">
          {/*  Sidebar (mobile pe overlay, desktop pe fixed) */}
          <Sidebar />

          {/*  Right side: Navbar + Scrollable Content */}
          <div className="flex-1 flex flex-col h-screen min-w-0">
            {/*  Navbar Fixed */}
            <Navbar user={user} />

            {/*  Sirf Content Scroll Hoga — responsive padding */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
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

  // ✅ Auth pages check karo
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

  // ✅ Auth pages pe sirf children show karo (Sidebar/Navbar nahi)
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
        <div className="flex h-screen">
          {/* ✅ Sidebar Fixed */}
          <Sidebar />

          {/* ✅ Right side: Navbar + Scrollable Content */}
          <div className="flex-1 flex flex-col h-screen">
            {/* ✅ Navbar Fixed */}
            <Navbar user={user}
             />

            {/* ✅ Sirf Content Scroll Hoga */}
            <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
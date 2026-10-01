"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { apiRequest } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

// Inter font setup
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  // ✅ Landing + Auth pages — Sidebar/Navbar hide
  const isLandingPage = pathname === "/";
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const shouldHideNav = isLandingPage || isAuthPage;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token || shouldHideNav) return;

      try {
        const data = await apiRequest("/users");
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [shouldHideNav]);

  // ✅ Landing + Auth pages pe sirf children show karo
  if (shouldHideNav) {
    return (
      <html lang="en" className={inter.className}>
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en" className={inter.className}>
      <body className="h-screen overflow-hidden">
        <div className="flex h-screen">
          {/* Sidebar (mobile pe overlay, desktop pe fixed) */}
          <Sidebar />

          {/* Right side: Navbar + Scrollable Content */}
          <div className="flex-1 flex flex-col h-screen min-w-0">
            {/* Navbar Fixed */}
            <Navbar user={user} />

            {/* Sirf Content Scroll Hoga — responsive padding */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
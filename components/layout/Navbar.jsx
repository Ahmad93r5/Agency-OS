"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Navbar({ user }) {
  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  // ✅ User ka initial nikaalo
  const initial = user?.name?.charAt(0).toUpperCase() || "G";

  return (
    <nav className="border-b border-gray-200 sticky top-0 z-20 backdrop-blur-sm bg-white/95">
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3">
        {/* ✅ User info with avatar */}
        <div className="flex items-center gap-3 min-w-0 pl-12 md:pl-0">
          {/* Avatar */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm md:text-base font-semibold shrink-0 shadow-sm">
            {initial}
          </div>

          {/* Welcome text */}
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-gray-500 leading-tight">
              Welcome back
            </p>
            <p className="text-sm md:text-base font-semibold text-gray-800 truncate">
              {user?.name || "Guest"}
            </p>
          </div>
        </div>

        {/* ✅ Logout button with Lucide icon */}
        <button
          onClick={Logout}
          className="group flex items-center gap-2 bg-gray-800 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base hover:bg-gray-700 active:scale-95 transition-all duration-200 shrink-0 shadow-sm"
        >
          <LogOut
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
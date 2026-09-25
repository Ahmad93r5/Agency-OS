"use client";

import { useRouter } from "next/navigation";

export default function Navbar({ user }) {
  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3">
        {/*  Welcome text — responsive size + truncate */}
        <span className="text-sm md:text-lg font-semibold text-gray-800 truncate pl-12 md:pl-0">
          {user ? `Welcome, ${user.name}` : "Welcome, Guest"}
        </span>

        {/*  Logout button — responsive */}
        <button
          onClick={Logout}
          className="bg-gray-800 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base hover:bg-gray-700 transition shrink-0"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
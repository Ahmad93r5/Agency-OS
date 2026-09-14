import React from "react";
import Link from "next/link";    
export default function Navbar({ user, Logout }) {
  
  
 return (
  <nav className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

         <span className="text-lg font-semibold text-gray-800">
          {user ? `Welcome, ${user.name}` : "Welcome, Guest"}
       </span>
  
       <button
          onClick={Logout}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>

    </div>
  </nav>
);
}
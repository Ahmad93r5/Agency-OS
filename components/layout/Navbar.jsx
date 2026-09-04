import React from "react";
import Link from "next/link";    
export default function Navbar({ user }) {
  
 return (
  <nav className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

         <span className="text-lg font-semibold text-gray-800">
          {user ? `Welcome, ${user.name}` : "Welcome, Guest"}
       </span>
  
      {/* <ul className="flex items-center gap-6 text-sm">
        <li>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            About
          </Link>
        </li>

        <li>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Contact
          </Link>
        </li>
      </ul> */}

    </div>
  </nav>
);
}
"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/workspaces", label: "Workspaces" },
    { href: "/clients", label: "Clients" },
  ];

  return (
    <>
      {/*  Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border border-gray-200 text-gray-700"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/*  Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/*  Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200
          px-5 py-6 flex flex-col z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close Button (Mobile) */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-800">Agency OS</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-800"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings — bottom */}
        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Settings
          </Link>
        </div>
      </aside>
    </>
  )
}
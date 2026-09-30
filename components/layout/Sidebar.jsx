"use client";

import Link from "next/link";
import Image from "next/image";              
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/workspaces", label: "Workspaces", icon: Building2 },
    { href: "/clients", label: "Clients", icon: Users },
  ];

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200
          px-4 py-6 flex flex-col z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo / Close Button */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2.5">
            {/* ✅ Next.js Image component */}
            <Image
              src="/logo.png"
              alt="Agency OS"
              width={36}
              height={36}
              className="w-9 h-9 rounded-lg object-contain"
              priority
            />
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Agency OS
              </h2>
              <p className="text-xs text-gray-500 leading-tight">
                Client Management
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-800 transition"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-sm font-medium transition-all duration-200
                      ${
                        active
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-0.5"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      className="transition-transform group-hover:scale-110"
                    />
                    <span>{item.label}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings — Bottom */}
        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className={`
              group flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-sm font-medium transition-all duration-200
              ${
                isActive("/settings")
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-0.5"
              }
            `}
          >
            <Settings
              size={18}
              className="transition-transform group-hover:rotate-90 duration-300"
            />
            <span>Settings</span>
            {isActive("/settings") && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
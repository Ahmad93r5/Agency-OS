import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 px-5 py-6 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        Agency OS
      </h2>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
               Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/workspaces"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
               Workspaces
            </Link>
          </li>

          <li>
            <Link
              href="/clients"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
               Clients
            </Link>
          </li>

          <li>
            <Link
              href="/notes"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
               Notes
            </Link>
          </li>
        </ul>
      </nav>

      {/* Settings — bottom pe */}
      <div className="pt-4 border-t border-gray-200">
        <Link
          href="/settings"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
        >
           Settings
        </Link>
      </div>
    </aside>
  );
}
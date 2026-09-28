"use client";

import {
  Building2,
  Users,
  FileText,
  Plus,
} from "lucide-react";

export default function DashboardUI({
  user,
  stats,
  loading,
  handleNavigate,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-4 md:p-8">
        
        {/* Welcome */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Here&apos;s what&apos;s happening in your Agency OS.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading dashboard...</p>
          </div>
        )}

        {/* Stats Cards */}
        {!loading && (
          <>
            {/* Stats cards — 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 md:mb-8">
              {/* Workspaces Card */}
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-md transition group">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 size={20} className="text-blue-600" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {stats.workspaces}
                </p>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  Workspaces
                </p>
              </div>

              {/* Clients Card */}
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-md transition group">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users size={20} className="text-purple-600" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {stats.clients}
                </p>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  Clients
                </p>
              </div>

              {/* Notes Card */}
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-md transition group">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={20} className="text-green-600" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {stats.notes}
                </p>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  Notes
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 mb-6 md:mb-8">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                Quick Actions
              </h2>
              {/* Buttons full width mobile pe, inline desktop pe */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="group bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 active:scale-95"
                >
                  <Plus size={16} className="transition-transform group-hover:rotate-90 duration-300" />
                  New Workspace
                </button>
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="group bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 active:scale-95"
                >
                  <Plus size={16} className="transition-transform group-hover:rotate-90 duration-300" />
                  New Client
                </button>
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="group bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 active:scale-95"
                >
                  <Plus size={16} className="transition-transform group-hover:rotate-90 duration-300" />
                  Add Note
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
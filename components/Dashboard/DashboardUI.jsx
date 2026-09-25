"use client";

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
            👋 Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Here_s what_s happening in your Agency OS.
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
            {/*  Stats cards — 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 md:mb-8">
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-sm transition">
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {stats.workspaces}
                </p>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  🏢 Workspaces
                </p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-sm transition">
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {stats.clients}
                </p>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  👥 Clients
                </p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-sm transition">
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {stats.notes}
                </p>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  📝 Notes
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 mb-6 md:mb-8">
              <h2 className="font-semibold text-gray-800 mb-3">
                ⚡ Quick Actions
              </h2>
              {/*  Buttons full width mobile pe, inline desktop pe */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm md:text-base w-full sm:w-auto"
                >
                  + New Workspace
                </button>
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-sm md:text-base w-full sm:w-auto"
                >
                  + New Client
                </button>
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm md:text-base w-full sm:w-auto"
                >
                  + Add Note
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
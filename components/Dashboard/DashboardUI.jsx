"use client";

export default function DashboardUI({
  user,
  stats,
  loading,
  // handleLogout,
  handleNavigate,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
             Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening in your Agency OS.
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.workspaces}
                    </p>
                    <p className="text-gray-500 mt-1"> Workspaces</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.clients}
                    </p>
                    <p className="text-gray-500 mt-1"> Clients</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.notes}
                    </p>
                    <p className="text-gray-500 mt-1"> Notes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
              <h2 className="font-semibold text-gray-800 mb-3">
                 Quick Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  + New Workspace
                </button>
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                >
                  + New Client
                </button>
                <button
                  onClick={() => handleNavigate("/workspaces")}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
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
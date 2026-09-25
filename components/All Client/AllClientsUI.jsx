"use client";

export default function AllClientsUI({
  clients,
  loading,
  error,
  onClientClick,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Clients
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            All clients across your workspaces
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading clients...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && clients.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-12 text-center">
            <p className="text-gray-500 text-base md:text-lg">No clients yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Add clients from your workspaces
            </p>
          </div>
        )}

        {/* Clients List */}
        {!loading && clients.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {clients.map((client) => (
              <div
                key={client.id}
                onClick={() => onClientClick(client.workspace.id, client.id)}
                className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-md hover:border-gray-300 transition cursor-pointer"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base md:text-lg font-semibold shrink-0">
                    {client.name?.charAt(0).toUpperCase() || "?"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 truncate">
                      {client.email}
                    </p>

                    {/* Workspace Badge */}
                    <div className="mt-2 inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full max-w-full">
                      <span className="truncate">🏢 {client.workspace.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
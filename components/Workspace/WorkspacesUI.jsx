export default function WorkspacesUI({
  workspaces,
  workspaceName,
  setWorkspaceName,
  workspaceEditName,
  setWorkspaceEditName,
  editingId,
  setEditingId,
  createWorkspace,
  editWorkspace,
  deleteWorkspace,
  Logout,
  loading,
  error,
  setError        
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome to Workspaces
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading workspaces...</p>
          </div>
        )}

        {!loading && Array.isArray(workspaces) && workspaces.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No workspaces yet. Create your first workspace!</p>
          </div>
        )}

        {!loading && Array.isArray(workspaces) && workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="bg-white p-4 mb-4 rounded border flex items-center justify-between"
          >
            <p className="font-medium text-gray-800">{workspace.name}</p>

            <div className="flex gap-2 items-center">
              {/* View Clients Button */}
              <a
                href={`/workspaces/${workspace.id}/clients`}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
              >
                View Clients
              </a>

              {editingId === workspace.id ? (
                <>
                  <input
                    type="text"
                    value={workspaceEditName}
                    onChange={(e) => setWorkspaceEditName(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />

                  <button
                    onClick={() => editWorkspace(workspace.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(workspace.id);
                    setWorkspaceEditName(workspace.name);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteWorkspace(workspace.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Create Workspace */}
        <div className="bg-white p-5 rounded border mt-6">
          <label
            htmlFor="workspaceName"
            className="block mb-2 font-medium text-gray-700"
          >
            Workspace Name
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              id="workspaceName"
              name="workspaceName"
              required
              className="border px-3 py-2 rounded w-full"
            />

            <button
              onClick={createWorkspace}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Create
            </button>
          </div>
        </div>

        <button
          onClick={Logout}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </main>
    </div>
  );
}
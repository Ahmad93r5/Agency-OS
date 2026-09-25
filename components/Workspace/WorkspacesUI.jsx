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
  loading,
  error,
  setError,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          Welcome to Workspaces
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center justify-between gap-2">
            <span className="text-sm md:text-base">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 shrink-0"
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

        {/* Empty State */}
        {!loading && Array.isArray(workspaces) && workspaces.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 text-center">
            <p className="text-gray-500">
              No workspaces yet. Create your first workspace!
            </p>
          </div>
        )}

        {/* Workspaces List */}
        {!loading &&
          Array.isArray(workspaces) &&
          workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="bg-white p-4 mb-4 rounded border flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              {/* Workspace name */}
              <p className="font-medium text-gray-800 wrap-break-word">
                {workspace.name}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* View Clients Button */}
                <a
                  href={`/workspaces/${workspace.id}/clients`}
                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition text-sm"
                >
                  View Clients
                </a>

                {editingId === workspace.id ? (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={workspaceEditName}
                        onChange={(e) => {
                          setWorkspaceEditName(e.target.value);
                          e.target.setCustomValidity("");
                        }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            "Please fill out this field."
                          );
                        }}
                        className="border text-black px-2 py-1 rounded pr-8 text-sm w-32 md:w-auto"
                        autoFocus
                        required
                      />
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setWorkspaceEditName("");
                        }}
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        const input = document.querySelector(
                          'input[type="text"]'
                        );
                        if (!input.value.trim()) {
                          input.reportValidity();
                          return;
                        }
                        editWorkspace(workspace.id);
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(workspace.id);
                      setWorkspaceEditName(workspace.name);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteWorkspace(workspace.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        {/* Create Workspace Form */}
        <div className="bg-white p-4 md:p-5 rounded border mt-6">
          <label
            htmlFor="workspaceName"
            className="block mb-2 font-medium text-gray-700 text-sm md:text-base"
          >
            Workspace Name
          </label>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => {
                  setWorkspaceName(e.target.value);
                  e.target.setCustomValidity("");
                }}
                onInvalid={(e) => {
                  e.target.setCustomValidity("Please fill out this field.");
                }}
                id="workspaceName"
                name="workspaceName"
                required
                className="border text-black px-3 py-2 rounded w-full text-sm md:text-base"
              />
            </div>

            <button
              onClick={(e) => {
                const input = document.getElementById("workspaceName");
                if (!input.value.trim()) {
                  input.reportValidity();
                  return;
                }
                createWorkspace();
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm md:text-base w-full sm:w-auto"
            >
              Create
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
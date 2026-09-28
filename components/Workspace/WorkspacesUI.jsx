"use client";

import {
  Building2,
  Users,
  Pencil,
  Trash2,
  Save,
  X,
  Plus,
} from "lucide-react";

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
              <X size={16} />
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
              className="bg-white p-4 mb-4 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-sm transition"
            >
              {/* Workspace name with icon */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Building2 size={18} className="text-blue-600" />
                </div>
                <p className="font-medium text-gray-800 wrap-break-word truncate">
                  {workspace.name}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* View Clients Button */}
                <a
                  href={`/workspaces/${workspace.id}/clients`}
                  className="bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                >
                  <Users size={14} />
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
                        className="border border-gray-300 text-black px-3 py-1.5 rounded-md pr-8 text-sm w-32 md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        required
                      />
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setWorkspaceEditName("");
                        }}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition"
                      >
                        <X size={14} />
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
                      className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                    >
                      <Save size={14} />
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(workspace.id);
                      setWorkspaceEditName(workspace.name);
                    }}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteWorkspace(workspace.id)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}

        {/* Create Workspace Form */}
        <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 mt-6">
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
                className="border border-gray-300 text-black px-3 py-2 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter workspace name"
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
              className="group bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus
                size={16}
                className="transition-transform group-hover:rotate-90 duration-300"
              />
              Create
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
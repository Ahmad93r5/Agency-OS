"use client";

import Link from "next/link";

export default function ClientsUI({
  clients,
  loading,
  error,
  setError,
  addDialogRef,
  editDialogRef,
  deleteDialogRef,
  addForm,
  setAddForm,
  editForm,
  setEditForm,
  isAdding,
  isEditing,
  isDeleting,
  handleAddSubmit,
  handleEditSubmit,
  handleDelete,
  setDeleteId,
  workspaceId,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
          <button
            onClick={() => addDialogRef.current.showModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Add Client
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">
              ✕
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && <p className="text-gray-500">Loading clients...</p>}

        {/* Empty State */}
        {!loading && clients.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No clients yet. Create your first client!</p>
          </div>
        )}

        {/* Clients List */}
        {!loading &&
          clients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-4 mb-3 rounded-lg border border-gray-200 flex items-center justify-between hover:shadow-sm transition"
            >
              <div>
                <p className="font-medium text-gray-800">{client.name}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
                {client.phone && <p className="text-sm text-gray-500">{client.phone}</p>}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/workspaces/${workspaceId}/clients/${client.id}/notes`}
                  className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition text-sm"
                >
                  View Notes
                </Link>
                <button
                  onClick={() => {
                    setEditForm({
                      id: client.id,
                      name: client.name,
                      email: client.email,
                      phone: client.phone || "",
                    });
                    editDialogRef.current.showModal();
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteId(client.id);
                    deleteDialogRef.current.showModal();
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        {/* ➕ Add Dialog */}
        <dialog
          ref={addDialogRef}
          className="rounded-lg shadow-lg border border-gray-200 p-0 backdrop:bg-black/50"
        >
          <div className="w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Client</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter client name"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter client email"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="Enter client phone (optional)"
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => addDialogRef.current.close()}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isAdding ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* ✏️ Edit Dialog */}
        <dialog
          ref={editDialogRef}
          className="rounded-lg shadow-lg border border-gray-200 p-0 backdrop:bg-black/50"
        >
          <div className="w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Client</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter client name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter client email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="Enter client phone (optional)"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => editDialogRef.current.close()}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isEditing ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* 🗑️ Delete Dialog */}
        <dialog
          ref={deleteDialogRef}
          className="rounded-lg shadow-lg border border-gray-200 p-0 backdrop:bg-black/50"
        >
          <div className="w-full max-w-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Delete Client</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this client? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteDialogRef.current.close()}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </dialog>
      </main>
    </div>
  );
}
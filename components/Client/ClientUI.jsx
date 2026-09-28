"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  X,
  User,
  Mail,
  Phone,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

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
      <main className="flex-1 p-4 md:p-8">
        <button
          onClick={() => window.history.back()}
          className="mb-4 inline-flex items-center gap-1.5 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-gray-900 transition text-sm shadow-sm active:scale-95"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Clients
          </h1>
          <button
            onClick={() => addDialogRef.current.showModal()}
            className="group bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus
              size={16}
              className="transition-transform group-hover:rotate-90 duration-300"
            />
            Add Client
          </button>
        </div>

        {/* Error */}
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

        {/* Loading */}
        {loading && <p className="text-gray-500">Loading clients...</p>}

        {/* Empty State */}
        {!loading && clients.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 text-center">
            <p className="text-gray-500">
              No clients yet. Create your first client!
            </p>
          </div>
        )}

        {/* Clients List */}
        {!loading &&
          clients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-4 mb-3 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-sm transition"
            >
              {/* Client info with avatar */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold shrink-0">
                  {client.name?.charAt(0).toUpperCase() || "?"}
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-gray-800 wrap-break-word truncate">
                    {client.name}
                  </p>
                  <p className="text-sm text-gray-500 wrap-break-word truncate flex items-center gap-1">
                    <Mail size={12} />
                    {client.email}
                  </p>
                  {client.phone && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone size={12} />
                      {client.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:shrink-0">
                <Link
                  href={`/workspaces/${workspaceId}/clients/${client.id}/notes`}
                  className="bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                >
                  <FileText size={14} />
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
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteId(client.id);
                    deleteDialogRef.current.showModal();
                  }}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}

        {/* Add Dialog */}
        <dialog
          ref={addDialogRef}
          className="rounded-xl shadow-2xl border border-gray-200 p-0 backdrop:bg-black/50 w-[90vw] max-w-md mx-auto"
        >
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Add New Client
              </h3>
              <button
                onClick={() => addDialogRef.current.close()}
                className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter client name"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm({ ...addForm, name: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter client email"
                  value={addForm.email}
                  onChange={(e) =>
                    setAddForm({ ...addForm, email: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  name="phone"
                  type="text"
                  placeholder="Enter client phone (optional)"
                  value={addForm.phone}
                  onChange={(e) =>
                    setAddForm({ ...addForm, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => addDialogRef.current.close()}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium text-sm md:text-base active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium text-sm md:text-base active:scale-95"
                >
                  {isAdding ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* Edit Dialog */}
        <dialog
          ref={editDialogRef}
          className="rounded-xl shadow-2xl border border-gray-200 p-0 backdrop:bg-black/50 w-[90vw] max-w-md mx-auto"
        >
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Edit Client
              </h3>
              <button
                onClick={() => editDialogRef.current.close()}
                className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter client name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter client email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  name="phone"
                  type="text"
                  placeholder="Enter client phone (optional)"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => editDialogRef.current.close()}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium text-sm md:text-base active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium text-sm md:text-base active:scale-95"
                >
                  {isEditing ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* Delete Dialog */}
        <dialog
          ref={deleteDialogRef}
          className="rounded-xl shadow-2xl border border-gray-200 p-0 backdrop:bg-black/50 w-[90vw] max-w-sm mx-auto"
        >
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Delete Client
              </h3>
              <button
                onClick={() => deleteDialogRef.current.close()}
                className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Are you sure you want to delete this client? This action cannot
              be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => deleteDialogRef.current.close()}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium text-sm md:text-base active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-medium text-sm md:text-base flex items-center justify-center gap-1.5 active:scale-95"
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 size={14} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </dialog>
      </main>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceEditName, setWorkspaceEditName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  // Show all workspaces for the logged-in user
  function fetchWorkspaces() {
    apiRequest("/workspaces")
      .then((data) => {
        console.log("API DATA:", data);
        setWorkspaces(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchWorkspaces();
    }
  }, [router]);

  // create new workspace
  function createWorkspace() {
    apiRequest("/workspaces", {
      method: "POST",
      body: JSON.stringify({
        name: workspaceName,
      }),
    })
      .then((data) => {
        setWorkspaceName(""); // create workspace and clear the input field
        fetchWorkspaces(); // Refresh the list of workspaces after creation
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // edit workspace
  function editWorkspace(workspaceId) {
    apiRequest(`/workspaces/${workspaceId}`, {
      method: "PUT",
      body: JSON.stringify({
        name: workspaceEditName,
      }),
    })
      .then((data) => {
        setWorkspaceEditName("");
        setEditingId(null);
        fetchWorkspaces(); // Refresh the list of workspaces after editing
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //delete workspace
  function deleteWorkspace(workspaceId) {
    apiRequest(`/workspaces/${workspaceId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchWorkspaces();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // logout function
  function Logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome to Workspaces
        </h1>

        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="bg-white p-4 mb-4 rounded border flex items-center justify-between"
          >
            <p className="font-medium text-gray-800">{workspace.name}</p>

            <div className="flex gap-2">
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
                    className="bg-green-600 text-white px-3 py-1 rounded"
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
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteWorkspace(workspace.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

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
              className="border px-3 py-2 rounded"
            />

            <button
              onClick={createWorkspace}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>

        <button
          onClick={Logout}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </main>
    </div>
  );
}

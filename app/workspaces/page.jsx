"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api"; 
import WorkspacesUI from "@/components/Workspace/WorkspacesUI";

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

  return(
     <WorkspacesUI
  workspaces={workspaces}
  workspaceName={workspaceName}
  setWorkspaceName={setWorkspaceName}
  workspaceEditName={workspaceEditName}
  setWorkspaceEditName={setWorkspaceEditName}
  editingId={editingId}
  setEditingId={setEditingId}
  createWorkspace={createWorkspace}
  editWorkspace={editWorkspace}
  deleteWorkspace={deleteWorkspace}
  Logout={Logout}
      />
  )
}

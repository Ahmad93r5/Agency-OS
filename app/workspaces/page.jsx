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

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchWorkspaces = async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/workspaces");
        setWorkspaces(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load workspaces");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, [router]);

  
  const refreshWorkspaces = async () => {
    try {
      const data = await apiRequest("/workspaces");
      setWorkspaces(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to refresh workspaces");
    }
  };

  // Create 
  const createWorkspace = async () => {
    try {
      await apiRequest("/workspaces", {
        method: "POST",
        body: JSON.stringify({ name: workspaceName }),
      });
      setWorkspaceName("");
      await refreshWorkspaces();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create workspace");
    }
  };

  // Edit 
  const editWorkspace = async (workspaceId) => {
    try {
      await apiRequest(`/workspaces/${workspaceId}`, {
        method: "PUT",
        body: JSON.stringify({ name: workspaceEditName }),
      });
      setWorkspaceEditName("");
      setEditingId(null);
      await refreshWorkspaces();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update workspace");
    }
  };

  // Delete 
  const deleteWorkspace = async (workspaceId) => {
    try {
      await apiRequest(`/workspaces/${workspaceId}`, {
        method: "DELETE",
      });
      await refreshWorkspaces();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to delete workspace");
    }
  };

  
  const Logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
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
      loading={loading}
      error={error}
    />
  );
}
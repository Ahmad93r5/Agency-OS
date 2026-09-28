"use client";
import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "@/lib/api";
import WorkspacesUI from "@/components/Workspace/WorkspacesUI";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceEditName, setWorkspaceEditName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  useCallback — fetchWorkspaces
  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/workspaces");
      setWorkspaces(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load workspaces");

      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  //  useCallback — refreshWorkspaces
  const refreshWorkspaces = useCallback(async () => {
    try {
      const data = await apiRequest("/workspaces");
      setWorkspaces(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to refresh workspaces");

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, []);

  //  useCallback — createWorkspace
  const createWorkspace = useCallback(async () => {
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

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [workspaceName, refreshWorkspaces]);

  // useCallback — editWorkspace
  const editWorkspace = useCallback(
    async (workspaceId) => {
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
        setError("Failed to edit workspace");

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    },
    [workspaceEditName, refreshWorkspaces]
  );

  //  useCallback — deleteWorkspace
  const deleteWorkspace = useCallback(
    async (workspaceId) => {
      try {
        await apiRequest(`/workspaces/${workspaceId}`, {
          method: "DELETE",
        });
        await refreshWorkspaces();
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to delete workspace");

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    },
    [refreshWorkspaces]
  );

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
      loading={loading}
      error={error}
    />
  );
}
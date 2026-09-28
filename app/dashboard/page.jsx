"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import DashboardUI from "@/components/Dashboard/DashboardUI";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ workspaces: 0, clients: 0, notes: 0 });
  const [loading, setLoading] = useState(true);

  //  useCallback — fetchData ko memoize karo
  const fetchData = useCallback(async () => {
    try {
      // User info
      const userData = await apiRequest("/users");
      setUser(userData.user);

      // Workspaces
      const workspaces = await apiRequest("/workspaces");

      let totalClients = 0;
      let totalNotes = 0;

      if (workspaces.length > 0) {
        //  Saare workspaces ke clients count karo (parallel)
        const clientsPromises = workspaces.map((ws) =>
          apiRequest(`/workspaces/${ws.id}/clients`).catch(() => [])
        );
        const clientsResults = await Promise.all(clientsPromises);

        // Har workspace ke clients count
        const allClients = clientsResults.flat();
        totalClients = allClients.length;

        //  Saare clients ke notes count karo (parallel)
        const notesPromises = [];
        workspaces.forEach((ws, idx) => {
          clientsResults[idx].forEach((client) => {
            notesPromises.push(
              apiRequest(
                `/workspaces/${ws.id}/clients/${client.id}/notes`
              ).catch(() => [])
            );
          });
        });

        const notesResults = await Promise.all(notesPromises);
        totalNotes = notesResults.reduce((sum, notes) => sum + notes.length, 0);
      }

      setStats({
        workspaces: workspaces.length,
        clients: totalClients,
        notes: totalNotes,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, []); //  Empty dependency

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]); //  fetchData dependency

  //  useCallback — handleNavigate
  const handleNavigate = useCallback(
    (path) => {
      router.push(path);
    },
    [router]
  );

  return (
    <DashboardUI
      user={user}
      stats={stats}
      loading={loading}
      handleNavigate={handleNavigate}
    />
  );
}
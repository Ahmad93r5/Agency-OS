"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import DashboardUI from "@/components/Dashboard/DashboardUI";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ workspaces: 0, clients: 0, notes: 0 });
  const [loading, setLoading] = useState(true);

  //  Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
     

      try {
        // User info
        const userData = await apiRequest("/users");
        setUser(userData.user);

        // Workspaces
        const workspaces = await apiRequest("/workspaces");

        // Clients aur Notes — pehle workspace se
        let totalClients = 0;
        let totalNotes = 0;

        if (workspaces.length > 0) {
          const workspaceId = workspaces[0].id;

          try {
            const clients = await apiRequest(
              `/workspaces/${workspaceId}/clients`
            );
            totalClients = clients.length;

            // Har client ke notes count karo
            for (const client of clients) {
              const notes = await apiRequest(
                `/workspaces/${workspaceId}/clients/${client.id}/notes`
              );
              totalNotes += notes.length;
            }
          } catch (err) {
            console.error("Failed to fetch clients/notes:", err);
          }
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
    };

    fetchData();
  }, [router]);

  
  //  Quick action navigation
  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <DashboardUI
      user={user}
      stats={stats}
      loading={loading}
      handleNavigate={handleNavigate}
    />
  );
}
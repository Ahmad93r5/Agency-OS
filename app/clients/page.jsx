"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import AllClientsUI from "@/components/All Client/AllClientsUI";

export default function AllClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/clients");
        setClients(data);
      } catch (err) {
        console.error("Failed to load clients:", err);
        setError("Failed to load clients. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientClick = (workspaceId, clientId) => {
    router.push(`/workspaces/${workspaceId}/clients/${clientId}/notes`);
  };

  return (
    <AllClientsUI
      clients={clients}
      loading={loading}
      error={error}
      onClientClick={handleClientClick}
    />
  );
}
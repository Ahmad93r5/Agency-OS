"use server";

import { cookies } from "next/headers";

export async function generateBriefing(workspaceId, clientId) {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Unauthorized. Please login again." };
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:3001/workspaces/${workspaceId}/clients/${clientId}/notes/generate_briefing`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate briefing");
    }

    const data = await response.json();
    return { briefing: data.briefing };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { error: "Failed to generate briefing. Please try again." };
  }
}
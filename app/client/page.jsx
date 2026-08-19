"use client";

import { useState, useEffect } from "react";

export default function Client() {
   
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClient = async () => {
        const token = localStorage.getItem("token")

        const response = await fetch(  `http://localhost:3001/workspaces/${workspaceId}/clients`,
            {
                   headers: {
                           Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                   },
            });
            if (!response.ok) {
                throw new Error("Api Request Failed")
            }
               const data = await response.json(); 
               setClient(data);  
               setLoading(false); 
    };

useEffect(() => {
  const loadClients = async () => {
    await fetchClient();
  };

  loadClients();
}, []);


    return(
        a
    )
}
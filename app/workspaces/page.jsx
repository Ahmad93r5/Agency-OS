"use client";
import React from "react";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";


export default function Workspaces () {
   
    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceName, setWorkspaceName] = useState("");
    const [workspaceEditName, setWorkspaceEditName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const router = useRouter();
    
// Show all workspaces for the logged-in user
         function fetchWorkspaces() {
    const token = localStorage.getItem("token");
      fetch("http://localhost:3001/workspaces", {
          
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`},     
       })
      .then((response) => response.json())
      .then((data) => {     console.log("API DATA:", data);
        setWorkspaces(data);})
      .catch((error) => {console.error("Error:", error);}); 
   } 

 useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token)
    { router.push("/login"); }
    else { fetchWorkspaces(); }
 }, [router]);

 // create new workspace
  function createWorkspace() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/workspaces", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: workspaceName,
        }),
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error("Failed to create workspace");
        }
        return response.json();
      })

      .then((data) => {
        console.log("WORKSPACE CREATED:", data);
        setWorkspaceName(""); // create workspace and clear the input field
        fetchWorkspaces(); // Refresh the list of workspaces after creation
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }

    // edit workspace
    function editWorkspace( workspaceId) {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:3001/workspaces/${workspaceId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: workspaceEditName,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to edit workspace");
            }
            return response.json();
          })
          .then((data) => {
            console.log("WORKSPACE EDITED:", data);
            console.log(data.errors);
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
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3001/workspaces/${workspaceId}`, {  

                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },     
    })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to delete workspace");
                }
                console.log("WORKSPACE DELETED");
                fetchWorkspaces();
              })            
              .catch((error) => {
                console.error("Error:", error);
              }) 
 }


 // logout function
        function Logout() {
        localStorage.removeItem("token")
            router.push("/login") 
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

            <p className="font-medium text-gray-800">
              {workspace.name}
            </p>

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
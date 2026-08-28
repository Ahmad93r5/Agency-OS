"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function NotesPage() {
       const {workspaceId, clientId} =useParams();


         const [notes, setNotes] = useState([]);
       const [content, setContent] = useState("");
       const [loading, setLoading] = useState(true);
       const [isAdding, setIsAdding] = useState(false);
       const [error, setError] = useState(null);
     

       console.log("workspaceId:", workspaceId, "clientId:", clientId);
       const fetchNotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiRequest(
               `/workspaces/${workspaceId}/clients/${clientId}/notes`
            );
                setNotes(data)
                console.log("Notes Fetched", data)
        }
        catch (error) {
            console.error("failed to fetch notes", error);
                setError("failed to load notes. Please refresh.")
        }
        finally {
            setLoading(false);
        }

       }

       useEffect(() => {
        if (clientId) {
            fetchNotes();
        }
       },[clientId]);

       const handleAddNote = async (e) => {
             e.preventDefault();
             if (!content.trim()) return;

       setIsAdding(true);
       setError(null);

            try {
              await apiRequest(
                `/workspaces/${workspaceId}/clients/${clientId}/notes`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    note: { content }
                  })
                }
              );
              setContent("");
              await fetchNotes();
            } catch (error) {
              console.error("Failed to add note:", error);
              setError("Failed to add note. Please try again.");
            } finally {
              setIsAdding(false);
            }
};



    return(
         <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Notes</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">✕</button>
          </div>
        )}

        <form onSubmit={handleAddNote} className="bg-white p-4 rounded-lg border mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note..."
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isAdding}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isAdding ? "Adding..." : "Add Note"}
          </button>
        </form>

        {loading && <p className="text-gray-500">Loading notes...</p>}

        {!loading && notes.length === 0 && (
          <div className="bg-white rounded-lg border p-8 text-center">
            <p className="text-gray-500">No notes yet. Add your first note!</p>
          </div>
        )}

        {!loading && notes.map((note) => (
          <div key={note.id} className="bg-white p-4 mb-3 rounded-lg border">
            <p className="text-gray-800">{note.content}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(note.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </main>
    </div>

    );
}
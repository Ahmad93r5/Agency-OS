  "use client"
  import { useEffect, useState, useTransition  } from "react";
  import { useParams } from "next/navigation";
  import { apiRequest } from "@/lib/api";
  import consumer from "@/app/javascript/channels/consumer.js";
  import NotesUI from "@/components/Client Notes/NoteUI.jsx";
  import { generateBriefing } from "@/app/actions/notes"; 



  export default function NotesPage() {
        const {workspaceId, clientId} =useParams();


         const [notes, setNotes] = useState([]);
        const [content, setContent] = useState("");
        const [isAdding, setIsAdding] = useState(false);
        const [editNoteId, setEditNoteId] = useState(null);
        const [editContent, setEditContent] = useState("");
        const [file, setFile] = useState(null); 
        
        const [loading, setLoading] = useState(true);
       const [error, setError] = useState(null);

        const [briefing, setBriefing] = useState(null);
        const [briefingError, setBriefingError] = useState(null);
        const [isPending, startTransition] = useTransition();
 
         const [briefingHistory, setBriefingHistory] = useState([]);

      

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

                  const subscription = consumer.subscriptions.create(
                    {
                     channel: "NotesChannel",
                     client_id: clientId   
                    },
         {
              connected() {
                console.log("Connected to noteschannel");
              },
        received(data) {
          console.log("Real-time notereceived:", data);
          setNotes((prevNotes) => [data, ...prevNotes]);
        }
      });

          return () => {
            subscription.unsubscribe();
          };
              }
                }, [clientId]);


        const handleAddNote = async (e) => {
              e.preventDefault();
              if (!content.trim()) return;

              setIsAdding(true);
              setError(null);

           try {
            const formData = new FormData();
              formData.append("note[content]", content);
                 if (file) {
                   formData.append("note[file]", file);
                   }

              await apiRequest(
                   `/workspaces/${workspaceId}/clients/${clientId}/notes`,
                  {
                        method: "POST",
                        body: formData,
                        
                   }
          );
    setContent("");
    setFile(null);   
    await fetchNotes();
           } catch (error) {
             console.error("Failed to add note:", error);
             setError("Failed to add note. Please try again.");
           } finally {
             setIsAdding(false);
           }
         };
       
        // DElete note
        const handleDeleteNote = async (noteId) => {
          try {
            await apiRequest(
              `/workspaces/${workspaceId}/clients/${clientId}/notes/${noteId}`,
              {
                method: "DELETE",
              }
            );
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
          } catch (error) {
            console.error("failed to delete note:", error);
            setError("failed to delete note, try again.");
          }   
        }
          // update note
        const handleUpdateNote = async (noteId, updatedContent) => {
          
          try {
            await apiRequest(
              `/workspaces/${workspaceId}/clients/${clientId}/notes/${noteId}`,
              {
                method: "PUT",
                body: JSON.stringify({  
                  note: { content: updatedContent }
                })
              }
            );
            setNotes((prevNotes) =>
              prevNotes.map((note) =>
                note.id === noteId ? { ...note, content: updatedContent } : note
              )
            );
            setEditNoteId(null);
            setEditContent("");
          } catch (error) {
            console.error("failed to update note:", error);
            setError("failed to update note, try again.");
          }   
        }

        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };

        // Ai Briefing 
        const handleGenerateBriefing = () => {
              setBriefingError(null);
              setBriefing(null);
          
              startTransition(async () => {
                try {
                  const result = await generateBriefing(workspaceId, clientId);
                  if (result.error) {
                    setBriefingError(result.error);
                  } else {
                    setBriefing(result.briefing);
                     await fetchBriefingHistory();
                  }
                } catch (err) {
                  setBriefingError("Failed to generate briefing. Please try again.");
                }
              });
            };

              const fetchBriefingHistory = async () => {
                try {
                  const data = await apiRequest(`/clients/${clientId}/briefings`);
                  setBriefingHistory(data);
                } catch (error) {
                  console.error("Failed to fetch briefing history:", error);
                }
              };

        useEffect(() => {
          if (clientId) {
            fetchBriefingHistory();
          }
        }, [clientId]);


      return (
   <NotesUI
      notes={notes}
      loading={loading}
      error={error}
      setError={setError}
      content={content}
      setContent={setContent}
      isAdding={isAdding}
      handleAddNote={handleAddNote}
      handleDeleteNote={handleDeleteNote}
      handleUpdateNote={handleUpdateNote}
      editNoteId={editNoteId}
      setEditNoteId={setEditNoteId}
      editContent={editContent}
      setEditContent={setEditContent}
      handleFileChange={handleFileChange}
      file={file}
      briefing={briefing}
      isLoadingBriefing={isPending}   
      briefingError={briefingError}
      setBriefingError={setBriefingError}
      handleGenerateBriefing={handleGenerateBriefing}
      setBriefing={setBriefing}
      briefingHistory={briefingHistory}
    />
);
}
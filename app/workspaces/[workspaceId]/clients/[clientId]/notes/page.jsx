"use client";
import { useEffect, useState, useTransition, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import consumer from "@/app/javascript/channels/consumer.js";
import NotesUI from "@/components/Client Notes/NoteUI.jsx";
import { generateBriefing } from "@/app/actions/notes";

export default function NotesPage() {
  const { workspaceId, clientId } = useParams();

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [briefing, setBriefing] = useState(null);
  const [briefingError, setBriefingError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const [briefingHistory, setBriefingHistory] = useState([]);

  const fileInputRef = useRef(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest(
        `/workspaces/${workspaceId}/clients/${clientId}/notes`
      );
      setNotes(data);
    } catch (error) {
      console.error("failed to fetch notes", error);
      setError("Failed to load notes. Please refresh.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, clientId]);

  // ✅ Notes fetch — ALAG effect
  useEffect(() => {
    if (clientId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchNotes();
    }
  }, [clientId, fetchNotes]);

  // ✅ WebSocket subscription — ALAG effect, sirf clientId pe
  useEffect(() => {
    if (!clientId) return;

    const subscription = consumer.subscriptions.create(
      {
        channel: "NotesChannel",
        client_id: clientId,
      },
      {
        connected() {
          console.log("Connected to noteschannel");
        },
        received(data) {
          console.log("Real-time note received:", data);
          // Duplicate prevent
          setNotes((prevNotes) => {
            if (prevNotes.some((n) => n.id === data.id)) return prevNotes;
            return [data, ...prevNotes];
          });
        },
      }
    );

    return () => subscription.unsubscribe();
  }, [clientId]);   // ← Sirf clientId, fetchNotes nahi

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsAdding(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("note[content]", content);
      files.forEach((file) => {
        formData.append("note[files][]", file);
      });

      await apiRequest(
        `/workspaces/${workspaceId}/clients/${clientId}/notes`,
        {
          method: "POST",
          body: formData,
        }
      );

      setContent("");
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await fetchNotes();
    } catch (error) {
      console.error("Failed to add note:", error);
      setError("Failed to add note. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await apiRequest(
        `/workspaces/${workspaceId}/clients/${clientId}/notes/${noteId}`,
        { method: "DELETE" }
      );
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("failed to delete note:", error);
      setError("Failed to delete note, try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleUpdateNote = async (noteId, updatedContent) => {
    try {
      await apiRequest(
        `/workspaces/${workspaceId}/clients/${clientId}/notes/${noteId}`,
        {
          method: "PUT",
          body: JSON.stringify({ note: { content: updatedContent } }),
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
      setError("Failed to update note, try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fetchBriefingHistory = useCallback(async () => {
    try {
      const data = await apiRequest(
        `/workspaces/${workspaceId}/clients/${clientId}/briefings`
      );
      setBriefingHistory(data);
    } catch (error) {
      console.error("Failed to fetch briefing history:", error);
    }
  }, [workspaceId, clientId]);

  // ✅ Briefing fetch — ALAG effect
  useEffect(() => {
    if (clientId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchBriefingHistory();
    }
  }, [clientId, fetchBriefingHistory]);

  const handleGenerateBriefing = () => {
    setBriefingError(null);
    setBriefing(null);

    startTransition(async () => {
      try {
        const result = await generateBriefing(workspaceId, clientId);
        if (result.error) {
          setBriefingError(result.error);
          setTimeout(() => setBriefingError(null), 3000);
        } else {
          setBriefing(result.briefing);
          await fetchBriefingHistory();
        }
      } catch (err) {
        setBriefingError("Failed to generate briefing. Please try again.");
        setTimeout(() => setBriefingError(null), 3000);
      }
    });
  };

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
      handleFilesChange={handleFilesChange}
      files={files}
      handleRemoveFile={handleRemoveFile}
      fileInputRef={fileInputRef}
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
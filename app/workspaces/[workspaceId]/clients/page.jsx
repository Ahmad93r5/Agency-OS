"use client";

import {useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import ClientsUI from "@/components/Client/ClientUI";


export default function Clients() {
  const { workspaceId } = useParams();
  
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [addForm, setAddForm] = useState({ name: '', email: '', phone: '' });
  const [isAdding, setIsAdding] = useState(false);
  const addDialogRef = useRef(null);
  
  const [editForm, setEditForm] = useState({ id: null, name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const editDialogRef = useRef(null);
  
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteDialogRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await apiRequest(`/workspaces/${workspaceId}/clients`);
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
        setError('Failed to load clients. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    if (workspaceId) {
      fetchClients();
    }
  }, [workspaceId]);

    
  const refreshClients = async () => {
    try {
      const data = await apiRequest(`/workspaces/${workspaceId}/clients`);
      setClients(data);
    } catch (error) {
      console.error("Refresh error:", error);
      setError('Failed to refresh clients.');
    }
  };

  //  ADD client
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setError(null);
    
    try {
      await apiRequest(`/workspaces/${workspaceId}/clients`, {
        method: 'POST',
        body: JSON.stringify({
          name: addForm.name,
          email: addForm.email,
          phone: addForm.phone
        })
      });
      
      await refreshClients();
      setAddForm({ name: '', email: '', phone: '' });
      addDialogRef.current.close();
      
    } catch (error) {
      console.error("Add error:", error);
      setError('Failed to add client. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  //  EDIT Client
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    setError(null);
    
    try {
      await apiRequest(`/workspaces/${workspaceId}/clients/${editForm.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone
        })
      });
      await refreshClients();
      setEditForm({ id: null, name: '', email: '', phone: '' });
      editDialogRef.current.close();
      
    } catch (error) {
      console.error("Edit error:", error);
      setError('Failed to update client. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };

  //  Delete Client
  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await apiRequest(`/workspaces/${workspaceId}/clients/${deleteId}`, {
        method: 'DELETE'
      });
      
      await refreshClients();
      deleteDialogRef.current.close();
    } catch (error) {
      console.error("Delete error:", error);
      setError('Failed to delete client. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

 return (
    <ClientsUI
      clients={clients}
      loading={loading}
      error={error}
      setError={setError}
      addDialogRef={addDialogRef}
      editDialogRef={editDialogRef}
      deleteDialogRef={deleteDialogRef}
      addForm={addForm}
      setAddForm={setAddForm}
      editForm={editForm}
      setEditForm={setEditForm}
      isAdding={isAdding}
      isEditing={isEditing}
      isDeleting={isDeleting}
      handleAddSubmit={handleAddSubmit}
      handleEditSubmit={handleEditSubmit}
      handleDelete={handleDelete}
      setDeleteId={setDeleteId}
      workspaceId={workspaceId}
    />
  );
}
// app/workspaces/[workspaceId]/clients/page.jsx

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function Clients() {
  const { workspaceId } = useParams();
  
  
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Add Client 
  const [addForm, setAddForm] = useState({ name: '', email: '', phone: '' });
  const [isAdding, setIsAdding] = useState(false);
  const addDialogRef = useRef(null);
  
  // Edit Client 
  const [editForm, setEditForm] = useState({ id: null, name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const editDialogRef = useRef(null);
  
  // Delete Client 
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteDialogRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await apiRequest(`/workspaces/${workspaceId}/clients`);
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoading(false);
      }
    };

    if (workspaceId) {
      fetchClients();
    }
  }, [workspaceId]);

  //  Add Client
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    
    try {
      await apiRequest(`/workspaces/${workspaceId}/clients`, {
        method: 'POST',
        body: JSON.stringify(addForm)
      });
      
      // Refresh list
      const data = await apiRequest(`/workspaces/${workspaceId}/clients`);
      setClients(data);
      
      setAddForm({ name: '', email: '', phone: '' });
      addDialogRef.current.close();
      
    } catch (error) {
      alert('Failed to add client');
    } finally {
      setIsAdding(false);
    }
  };

  //  Edit Client
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    
    try {
      await apiRequest(`/workspaces/${workspaceId}/clients/${editForm.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: editForm.name, email: editForm.email, phone: editForm.phone })
      });
      
      const data = await apiRequest(`/workspaces/${workspaceId}/clients`);
      setClients(data);
      
      setEditForm({ id: null, name: '', email: '', phone: '' });
      editDialogRef.current.close();
      
    } catch (error) {
      alert('Failed to update client');
    } finally {
      setIsEditing(false);
    }
  };

  //  Delete Client
  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      await apiRequest(`/workspaces/${workspaceId}/clients/${deleteId}`, {
        method: 'DELETE'
      });
      
      const data = await apiRequest(`/workspaces/${workspaceId}/clients`);
      setClients(data);
      
      deleteDialogRef.current.close();
      
    } catch (error) {
      alert('Failed to delete client');
    } finally {
      setIsDeleting(false);
    }
  };

return (
  <div>
    {/* Header */}
    <div>
      <h1>Clients</h1>
      <button onClick={() => addDialogRef.current.showModal()}>
        Add Client
      </button>
    </div>

    {/* Loading */}
    {loading && <p>Loading...</p>}

    {/* Clients List */}
    {!loading && clients.map((client) => (
      <div key={client.id}>
        <p>{client.name}</p>
        <p>{client.email}</p>
        <p>{client.phone}</p>
        <button onClick={() => {
          setEditForm({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone
          });
          editDialogRef.current.showModal();
        }}>
          Edit
        </button>
        <button onClick={() => {
          setDeleteId(client.id);
          deleteDialogRef.current.showModal();
        }}>
          Delete
        </button>
      </div>
    ))}

    {/*  Add Dialog */}
    <dialog ref={addDialogRef}>
      <h3>Add Client</h3>
      <form onSubmit={handleAddSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={addForm.name}
          onChange={(e) => setAddForm({...addForm, name: e.target.value})}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={addForm.email}
          onChange={(e) => setAddForm({...addForm, email: e.target.value})}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={addForm.phone}
          onChange={(e) => setAddForm({...addForm, phone: e.target.value})}
        />
        <div>
          <button type="button" onClick={() => addDialogRef.current.close()}>
            Cancel
          </button>
          <button type="submit" disabled={isAdding}>
            {isAdding ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </dialog>

    {/*  Edit Dialog */}
    <dialog ref={editDialogRef}>
      <h3>Edit Client</h3>
      <form onSubmit={handleEditSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={editForm.name}
          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={editForm.email}
          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={editForm.phone}
          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
        />
        <div>
          <button type="button" onClick={() => editDialogRef.current.close()}>
            Cancel
          </button>
          <button type="submit" disabled={isEditing}>
            {isEditing ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </dialog>

    {/*  Delete Dialog */}
    <dialog ref={deleteDialogRef}>
      <h3>Delete Client</h3>
      <p>Are you sure you want to delete this client?</p>
      <div>
        <button onClick={() => deleteDialogRef.current.close()}>
          Cancel
        </button>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </dialog>
  </div>
);
}
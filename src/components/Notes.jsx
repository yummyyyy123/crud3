import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaSignOutAlt } from "react-icons/fa";

function Notes({ user, setUser }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data } = await supabase.from("notes").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setNotes(data);
  };

  const handleAddNote = async () => {
    if (!newNote) return;
    const { data } = await supabase
      .from("notes")
      .insert([{ content: newNote, user_id: user.id }])
      .select();
    setNotes([data[0], ...notes]);
    setNewNote("");
  };

  const handleDeleteNote = async (id) => {
    await supabase.from("notes").delete().eq("id", id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="notes-page">
      <header>
        <h1>💻 AI Notes</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sign Out
        </button>
      </header>

      <div className="add-note">
        <input
          type="text"
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleAddNote}>
          <FaPlus /> Add
        </button>
      </div>

      <div className="notes-grid">
        {notes.length === 0 && <p className="empty-msg">No notes yet. Add one above! 💡</p>}
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <p>{note.content}</p>
            <div className="note-footer">
              <span>{new Date(note.created_at).toLocaleString()}</span>
              <FaTrash className="delete-icon" onClick={() => handleDeleteNote(note.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;

// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/storage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TopBar from "./components/TopBar";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import EmptyState from "./components/EmptyState";

function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });
  }, []);

  const fetchNotes = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setNotes(data || []);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/"
          element={
            user ? (
              <>
                <TopBar user={user} setUser={setUser} />
                <NoteForm user={user} fetchNotes={fetchNotes} />
                <div className="notes-grid">
                  {notes.length ? (
                    notes.map((note) => (
                      <NoteCard key={note.id} note={note} fetchNotes={fetchNotes} />
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </div>
              </>
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

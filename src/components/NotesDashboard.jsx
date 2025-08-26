import React, { useState, useEffect } from "react";
import { getNotes, saveNote, aiSuggest } from "../services/api";
import NoteCard from "./NoteCard";

export default function NotesDashboard() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const userId = "user123"; // Replace with dynamic user ID if you have auth

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes(userId);
      setNotes(data || []);
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!input.trim()) return;
    await saveNote(userId, input);
    setNotes([{ content: input }, ...notes]);
    setInput("");
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-purple-50 to-pink-50">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">AI Notes</h1>
      </header>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border p-3 rounded-lg text-base sm:text-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new note..."
        />
        <button
          onClick={addNote}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
        >
          Add Note
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note, idx) => (
          <NoteCard key={idx} note={note} aiSuggest={aiSuggest} />
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { Trash2 } from "lucide-react";

export default function NoteCard({ note }) {
  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <span>{note.content}</span>
      <button>
        <Trash2 size={18} />
      </button>
    </li>
  );
}

import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getNotes = async (userId) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) console.error(error);
  return data;
};

export const saveNote = async (userId, content) => {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ user_id: userId, content }])
    .select(); // return inserted row
  if (error) console.error(error);
  return data;
};

export const aiSuggest = async (note) => {
  const res = await axios.post("/.netlify/functions/ai", { note });
  return res.data.suggestion;
};

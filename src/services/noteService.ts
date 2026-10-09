import axios from "axios";

import type { Note } from "../types/note";

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

interface NotesHttpResponse {
  notes: Note[];
  total: number;
}
interface CreateNoteData {
  title: string;
  content: string;
  categoryId: string;
}

export const fetchNotes = async (
  search: string,
  page: number,
): Promise<NotesHttpResponse> => {
  const response = await noteApi.get<NotesHttpResponse>("/notes", {
    params: {
      search,
      perPage: 12,
      page,
    },
  });
  return response.data;
};
export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await noteApi.post<Note>("/notes", noteData);
  return response.data;
};
export const deleteNote = async (noteId: string): Promise<void> => {
  await noteApi.delete(`/notes/${noteId}`);
};

export interface Note {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  category: NoteCategory;
  tag: NoteTag;
}

export interface NoteCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

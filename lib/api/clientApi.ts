import type { Note, CreateNoteData } from "@/types/note";
import { api } from "./api";
import type { User } from "@/types/user";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface RegisterRequest {
  password: string;
  email: string;
}

interface LoginRequest {
  password: string;
  email: string;
}

interface UpdateUserRequest {
  username: string;
}

export async function fetchNotes(
  page: number = 1,
  perPage: number = 10,
  search?: string,
  tag?: string,
): Promise<NoteResponse> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
  } = {
    page,
    perPage,
  };

  if (search?.trim()) {
    params.search = search.trim();
  }

  if (tag?.trim()) {
    params.tag = tag.trim();
  }

  const res = await api.get<NoteResponse>("/notes", {
    params,
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(newNote: CreateNoteData): Promise<Note> {
  const res = await api.post<Note>("/notes", newNote);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function register(data: RegisterRequest): Promise<User> {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: LoginRequest): Promise<User> {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function updateMe(data: UpdateUserRequest): Promise<User> {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
}
export async function getMe(): Promise<User> {
  const res = await api.get<User>("/users/me");
  return res.data;
}

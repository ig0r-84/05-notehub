import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [search] = useDebounce(inputValue, 5000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search],
    queryFn: () => fetchNotes(search, 1),
  });

  return (
    <div className={css.app}>
      <h1>NoteHub</h1>

      <SearchBox value={inputValue} onSearch={setInputValue} />

      {isLoading && <p>Завантаження нотаток...</p>}

      {isError && <p>Не вдалося завантажити нотатки.</p>}

      {!isLoading && !isError && data && (
        <ul>
          {data.notes.map((note) => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

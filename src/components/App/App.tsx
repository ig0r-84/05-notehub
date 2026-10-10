import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import css from "./App.module.css";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search] = useDebounce(inputValue, 500);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className={css.app}>
      <h1>NoteHub</h1>
      <button onClick={() => setIsModalOpen(true)}>Create note</button>
      <SearchBox
        value={inputValue}
        onSearch={(value) => {
          setInputValue(value);
          setPage(1);
        }}
      />

      {isLoading && <p>Завантаження нотаток...</p>}

      {isError && <p>Не вдалося завантажити нотатки.</p>}

      {!isLoading && !isError && data && (
        <>
          {" "}
          {data.notes.length > 0 ? (
            <NoteList
              notes={data.notes}
              onDelete={(id) => {
                deleteMutation.mutate(id);
              }}
              isDeleting={deleteMutation.isPending}
            />
          ) : (
            <p>Нотаток не знайдено.</p>
          )}
          <Pagination
            totalPages={data.totalPages}
            perPage={12}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSubmit={(values) => createMutation.mutate(values)}
          />
        </Modal>
      )}
    </div>
  );
}

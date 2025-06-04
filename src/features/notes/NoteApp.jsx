import './NoteApp.css'
import { useEffect, useState } from "react";
import { addNote, getNotes, deleteNote, updateNote } from "../db/firebaseFunctions";
import UpdateNoteModal from './UpdateModal';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes();
      setNotes(notesData);
    };
    fetchNotes();
  }, []);
  const handleAddNote = async () => {
    await addNote(title, content);
    setTitle("");
    setContent("");
    setNotes(await getNotes()); // Recargar notas
  };
  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes(await getNotes()); // Recargar notas
  };
  const handleUpdateNote = async (updatedFields) => {
    if (selectedNote) {
      await updateNote(selectedNote.id, updatedFields);
      setIsModalOpen(false); // Cerrar la ventana modal
      setNotes(await getNotes()); // Recargar notas
    }
  };
  const openUpdateModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true); // Abrir la ventana modal
  };
  return (
    <div className="note-app">

      <div className="note-form">
        <h1>Notas</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenido"></textarea>
        <button onClick={handleAddNote}>Agregar Nota</button>
      </div>

      <ul className="notes-list">
        {
          notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <button onClick={() => handleDeleteNote(note.id)}>Eliminar</button>
              <button onClick={() => openUpdateModal(note)}>Actualizar</button>

            </li>
          ))
        }
      </ul>

      {isModalOpen && (
        <UpdateNoteModal
          note={selectedNote}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateNote}
        />
      )}

    </div>
  )
}
export default NoteApp;
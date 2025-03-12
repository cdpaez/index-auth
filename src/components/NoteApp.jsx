import '../components/NoteApp.css'
import { useEffect, useState } from "react";
import { addNote, getNotes, deleteNote } from "../db/firebaseFunctions";

function NoteApp () {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(()=> {
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
  return(
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
            </li>
          ))
        }
      </ul>

    </div>
  )
}
export default NoteApp;
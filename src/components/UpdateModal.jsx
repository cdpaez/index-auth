import React, { useState } from "react";

const UpdateNoteModal = ({ note, onClose, onUpdate }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ title, content });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Actualizar Nota</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenido"
            required
          ></textarea>
          <button type="submit">Actualizar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNoteModal;
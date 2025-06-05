import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useId } from 'react';
import '../components/calendarModal.css';

export default function EventModal({ isOpen, onClose, onSave, initialData }) {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#3788d8');

    // Para generar un id único para aria-labelledby
    const titleId = useId();

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setColor(initialData.color || '#3788d8');
        } else {
            setTitle('');
            setColor('#3788d8');
        }
    }, [initialData]);

    const handleSave = () => {
        if (title.trim() === '') return;
        onSave({ title, color });
        onClose();
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                onClose={onClose}
                className="modal-overlay"
                as="div"
                aria-labelledby={titleId}
                aria-modal="true"
                role="dialog"
                static
            >
                <div className="modal-container" tabIndex={-1}>
                    <div className="modal-content">
                        <h2 id={titleId}>Guardar evento</h2>

                        <input
                            type="text"
                            placeholder="Título del evento"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="modal-input"
                        />

                        <div>
                            <label>Color</label>
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="modal-color-input"
                            />
                        </div>

                        <div className="modal-buttons">
                            <button onClick={onClose} className="modal-btn cancel-btn">Cancelar</button>
                            <button onClick={handleSave} className="modal-btn save-btn">Guardar</button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

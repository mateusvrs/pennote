import { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import { NoteColorPicker } from './components/NoteColorPicker';
import { NoteDatePicker } from './components/NoteDatePicker';
import { categoryRefType, NoteCategorySelect } from './components/NoteCategorySelect';

import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'

import { useNoteInfo } from '../../hooks/useNoteInfo';
import { useAuth } from '../../hooks/useAuth';

import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { database } from '../../services/firebase';

export function NewNote() {
    const { user } = useAuth()
    const { noteInfo, defaultNoteInfo, setNoteInfo } = useNoteInfo()
    const { color, text } = noteInfo

    const [categoryRef, setCategoryRef] = useState<categoryRefType>(null)
    
    async function handleCreateOrUpdateNewNote(event: FormEvent) {
        event.preventDefault()
        if (noteInfo.text.trim() !== '') {
            if (!noteInfo.id) {
                await addDoc(collection(database, `users/${user?.id}/notes`), noteInfo)
            } else {
                await updateDoc(doc(database, `users/${user?.id}/notes/${noteInfo.id}`), noteInfo)
            }
        } else {
            toast.error("Write something")
        }
        setNoteInfo(defaultNoteInfo)
        categoryRef?.clearValue()
    }

    return (
        <div style={{ backgroundColor: color }} className="new-note-container">
            <Toaster position="top-center" />
            <form onSubmit={handleCreateOrUpdateNewNote}>
                <textarea rows={5} maxLength={150} placeholder='Digite sua nota...'
                    value={text}
                    onChange={event => setNoteInfo({ ...noteInfo, text: event.target.value })}
                ></textarea>

                <div className="buttons-container">
                    <NoteColorPicker />
                    <NoteDatePicker />
                    <NoteCategorySelect categoryRef={categoryRef} setCategoryRef={setCategoryRef} />
                    <section>
                        <button style={{ backgroundColor: color }} type='submit' >
                            <span className="material-icons">add</span>
                        </button>
                    </section>
                </div>
            </form>
        </div>
    )
}
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { database } from '../../services/firebase'

import { useAuth } from '../../hooks/useAuth'
import { useNoteInfo } from '../../hooks/useNoteInfo'
import { useState } from 'react'

import './styles.scss'

import { NoteProps } from '../../types/components/Note'

export function Note(props: NoteProps) {
    const { user } = useAuth()
    const { setNoteInfo } = useNoteInfo()

    const [noteIsComplete, setNoteIsComplete] = useState(props.isComplete)

    async function handleDeleteNote(id: string) {
        await deleteDoc(doc(database, `users/${user?.id}/notes/${id}`))
    }

    function handleEditNote() {
        const { color, date, text, id, isComplete, category } = props
        setNoteInfo({ color, date, text, id, isComplete, category })
    }

    async function handleCompleteNote() {
        setNoteIsComplete(!noteIsComplete)
        await updateDoc(doc(database, `users/${user?.id}/notes/${props.id}`), { isComplete: !noteIsComplete })
    }

    return (
        <section style={{ backgroundColor: props.color }} className="note-container">
            <header>
                <h1>{props.category.label}</h1>
                <span className="material-icons-outlined" onClick={handleCompleteNote}>check_circle</span>
            </header>
            <main>
                <p style={{ textDecoration: noteIsComplete ? 'line-through' : 'none' }}>{props.text}</p>
            </main>
            <footer>
                <span className="date-text">{props.date}</span>
                <div>
                    <button style={{ backgroundColor: props.color, display: noteIsComplete ? 'none' : 'block' }} onClick={() => handleEditNote()}><span className="material-icons-outlined edit">edit</span></button>
                    <button style={{ backgroundColor: props.color }} onClick={() => handleDeleteNote(props.id)}><span className="material-icons-outlined delete">delete</span></button>
                </div>
            </footer>
        </section>
    )
}
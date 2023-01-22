import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { database } from '../../services/firebase'

import { useAuth } from '../../hooks/useAuth'
import { useNoteInfo } from '../../hooks/useNoteInfo'

import './styles.scss'

import { NoteProps } from '../../types/components/Note'

export function Note(props: NoteProps) {
    const { user } = useAuth()
    const { setNoteInfo } = useNoteInfo()

    const [, setShowNewNotePWA] = props.stateShowNewNotePWA

    async function handleDeleteNote(id: string) {
        await deleteDoc(doc(database, `users/${user?.id}/notes/${id}`))
    }

    function handleEditNote() {
        const { color, date, text, id, isComplete, category } = props
        setNoteInfo({ color, date, text, id, isComplete, category })
        setShowNewNotePWA(true)
    }

    async function handleCompleteNote() {
        await updateDoc(doc(database, `users/${user?.id}/notes/${props.id}`), { isComplete: !props.isComplete })
    }

    return (
        <section style={{ backgroundColor: props.color }} className="note-container">
            <header>
                <h1>{props.category.label}</h1>
                <span className="material-icons-outlined" onClick={handleCompleteNote}>check_circle</span>
            </header>
            <main>
                <pre style={{ textDecoration: props.isComplete ? 'line-through' : 'none' }}>{props.text}</pre>
            </main>
            <footer>
                <span className="date-text">{props.date}</span>
                <div>
                    <button style={{ backgroundColor: props.color, display: props.isComplete ? 'none' : 'block' }} onClick={() => handleEditNote()}><span className="material-icons-outlined edit">edit</span></button>
                    <button style={{ backgroundColor: props.color }} onClick={() => handleDeleteNote(props.id)}><span className="material-icons-outlined delete">delete</span></button>
                </div>
            </footer>
        </section>
    )
}
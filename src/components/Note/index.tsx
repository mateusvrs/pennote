import { deleteDoc, doc } from 'firebase/firestore'
import { database } from '../../services/firebase'

import { useAuth } from '../../hooks/useAuth'
import { useNoteInfo } from '../../hooks/useNoteInfo'
import { useState } from 'react'

import './styles.scss'

type NoteProps = {
    color: string
    date: string | null
    text: string
    id: string
}

export function Note(props: NoteProps) {
    const { user } = useAuth()
    const { setNoteInfo } = useNoteInfo()

    const [isComplete, setIsComplete] = useState(false)

    async function handleDeleteNote(id: string) {
        await deleteDoc(doc(database, `users/${user?.id}/notes/${id}`))
    }

    function handleEditNote() {
        const { color, date, text, id } = props
        setNoteInfo({ color, date, text, id })
    }

    return (
        <section style={{backgroundColor: props.color}} className="note-container">
            <span className="material-icons-outlined" onClick={() => setIsComplete(!isComplete)}>check_circle</span>
            <p style={{textDecoration: isComplete ? 'line-through' : 'none'}}>{props.text}</p>
            <footer>
                <span className="date-text">{props.date}</span>
                <div>
                    <button style={{backgroundColor: props.color, display: isComplete ? 'none' : 'block'}} onClick={() => handleEditNote()}><span className="material-icons-outlined edit">edit</span></button>
                    <button style={{backgroundColor: props.color}} onClick={() => handleDeleteNote(props.id)}><span className="material-icons-outlined delete">delete</span></button>
                </div>
            </footer>
        </section>
    )
}
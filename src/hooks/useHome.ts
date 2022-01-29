import { collection, onSnapshot, query } from "firebase/firestore"
import { database } from "../services/firebase"

import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

type NoteInfoType = {
    color: string
    date: string | null
    text: string
    id: string
}

export function useHome() {
    const { user } = useAuth()
    const [notes, setNotes] = useState([] as NoteInfoType[])

    useEffect(() => {
        const reference = query(collection(database, `users/${user?.id}/notes`))

        const unsubscribe = onSnapshot(reference, docsSnap => {
            if(docsSnap) {
                const receivedNotes: NoteInfoType[] = []
                docsSnap.forEach(doc => {
                    const { color, date, text } = doc.data()
                    const id = doc.id
                    receivedNotes.push({color, date, text, id })
                })

                setNotes(receivedNotes)
            }
        })

        return () => {
            unsubscribe()
        }

    }, [user?.id])

    return { notes }
}
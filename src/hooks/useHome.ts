import { collection, onSnapshot, query } from "firebase/firestore"
import { database } from "../services/firebase"

import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

import { NoteInfoType } from "../types/hooks/useHome"

export function useHome() {
    const { user } = useAuth()
    const [notes, setNotes] = useState([] as NoteInfoType[])
    
    useEffect(() => {
        const reference = query(collection(database, `users/${user?.id}/notes`))

        const unsubscribe = onSnapshot(reference, docsSnap => {
            if(docsSnap) {
                var receivedNotes: NoteInfoType[] = []
                docsSnap.forEach(doc => {
                    const { color, date, text, isComplete, category } = doc.data()
                    const id = doc.id
                    receivedNotes = [{color, date, text, id, isComplete, category }, ...receivedNotes]
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
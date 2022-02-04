import { ReactNode } from "react"

export type NoteInfoType = {
    color: string
    date: string | null
    text: string
    id: string | null
    isComplete: boolean
    category: {
        value: string | null
        label: string | null
    }
}

export type NoteInfoContextType = {
    noteInfo: NoteInfoType
    defaultNoteInfo: NoteInfoType
    setNoteInfo: (value: NoteInfoType) => void
}

export type NoteInfoContextProviderProps = {
    children: ReactNode
}
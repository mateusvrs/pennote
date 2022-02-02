import { createContext, ReactNode, useState } from "react";

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

type NoteInfoContextType = {
    noteInfo: NoteInfoType
    defaultNoteInfo: NoteInfoType
    setNoteInfo: (value: NoteInfoType) => void
}

type NoteInfoContextProviderProps = {
    children: ReactNode
}

export const NoteInfoContext = createContext({} as NoteInfoContextType)

export function NoteInfoContextProvider(props: NoteInfoContextProviderProps) {
    const defaultNoteInfo: NoteInfoType = {
        color: '#E5E5E5',
        text: '',
        date: null,
        id: null,
        isComplete: false,
        category: {
            value: null,
            label: null
        }
    }

    const [noteInfo, setNoteInfo] = useState<NoteInfoType>(defaultNoteInfo)

    return(
        <NoteInfoContext.Provider value={{ noteInfo, defaultNoteInfo, setNoteInfo }}>
            {props.children}
        </NoteInfoContext.Provider>
    )
}
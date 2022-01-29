import { createContext, ReactNode, useState } from "react";

type NoteInfoType = {
    color: string
    date: string | null
    text: string
    id: string | null
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
    const defaultNoteInfo = {
        color: '#E5E5E5',
        text: '',
        date: null,
        id: null
    }

    const [noteInfo, setNoteInfo] = useState<NoteInfoType>(defaultNoteInfo)

    return(
        <NoteInfoContext.Provider value={{ noteInfo, defaultNoteInfo, setNoteInfo }}>
            {props.children}
        </NoteInfoContext.Provider>
    )
}
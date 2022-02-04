import { createContext, useState } from "react";

import { NoteInfoContextProviderProps, NoteInfoContextType, NoteInfoType } from "../types/contexts/NoteInfoContext";

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
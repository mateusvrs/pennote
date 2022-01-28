import { createContext, FormEvent, useState } from 'react'

import "react-datepicker/dist/react-datepicker.css";
import { NoteColorPicker } from './components/NoteColorPicker';
import { NoteDatePicker } from './components/NoteDatePicker';

import './styles.scss'

type NoteInfoType = {
    color: string
    date: Date | null
    text: string
}

type NoteInfoContextType = {
    noteInfo: NoteInfoType
    setNoteInfo: React.Dispatch<React.SetStateAction<NoteInfoType>>
}

export const NoteInfoContext = createContext({} as NoteInfoContextType)

export function NewNote() {
    const defaultNoteInfo = {
        color: '#E5E5E5',
        text: '',
        date: new Date()
    }
    const [noteInfo, setNoteInfo] = useState<NoteInfoType>(defaultNoteInfo)
    const { color, text } = noteInfo

    function handleCreateNewNote(event: FormEvent) {
        event.preventDefault()
        setNoteInfo(defaultNoteInfo)
        console.log(noteInfo)
    }

    return (
        <NoteInfoContext.Provider value={{ noteInfo, setNoteInfo }}>
            <div style={{ backgroundColor: color }} className="new-note-container">
                <form onSubmit={handleCreateNewNote}>
                    <textarea rows={5} maxLength={150} placeholder='Digite sua nota...'
                        value={text}
                        onChange={event => {
                            setNoteInfo({
                                ...noteInfo,
                                text: event.target.value
                            })
                        }}
                    ></textarea>

                    <div className="buttons-container">
                        <NoteColorPicker />
                        <NoteDatePicker />
                        <section>
                            <button style={{ backgroundColor: color }} type='submit' >
                                <span className="material-icons">add</span>
                            </button>
                        </section>
                    </div>
                </form>
            </div>
        </NoteInfoContext.Provider>
    )
}
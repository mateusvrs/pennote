import { FormEvent, Fragment, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { isMobile } from 'react-device-detect';

import { NoteColorPicker } from './components/NoteColorPicker';
import { NoteDatePicker } from './components/NoteDatePicker';
import { NoteCategorySelect } from './components/NoteCategorySelect';

import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'

import { useNoteInfo } from '../../hooks/useNoteInfo';
import { useAuth } from '../../hooks/useAuth';
import { DarkContext } from '../../contexts/DarkContext';

import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { database } from '../../services/firebase';

import { CategoryRefType } from '../../types/components/NewNote/NoteCategorySelect';
import { NewNoteProps } from '../../types/components/NewNote';

export function NewNote({ stateShowNewNotePWA }: NewNoteProps) {
    const { user } = useAuth()
    const { noteInfo, defaultNoteInfo, setNoteInfo } = useNoteInfo()
    const { color, text } = noteInfo
    const { isDark } = useContext(DarkContext)

    const [categoryRef, setCategoryRef] = useState<CategoryRefType>(null)
    const [isPWA, setIsPWA] = useState(false)
    const [showNewNotePWA, setShowNewNotePWA] = stateShowNewNotePWA

    useEffect(() => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        setIsPWA(isStandalone)

    }, [setIsPWA])

    async function handleCreateOrUpdateNewNote(event: FormEvent) {
        event.preventDefault()
        if (noteInfo.text.trim() !== '') {
            setShowNewNotePWA(false)
            if (!noteInfo.id) {
                await addDoc(collection(database, `users/${user?.id}/notes`), noteInfo)
            } else {
                await updateDoc(doc(database, `users/${user?.id}/notes/${noteInfo.id}`), noteInfo)
            }
        } else {
            toast.error("Write something")
        }
        setNoteInfo(defaultNoteInfo)
        categoryRef?.clearValue()
    }

    function NewNoteWeb(configPWA = false) {
        return (
            <div style={{ backgroundColor: color }} className='new-note-container' id={`pwa-new-note-${configPWA}`}>
                <form onSubmit={handleCreateOrUpdateNewNote}>
                    <textarea rows={5} maxLength={150} placeholder='Digite sua nota...'
                        value={text}
                        onChange={event => setNoteInfo({ ...noteInfo, text: event.target.value })}
                    ></textarea>

                    <div className="buttons-container">
                        <NoteColorPicker />
                        <NoteDatePicker />
                        <NoteCategorySelect isPWA={configPWA} categoryRef={categoryRef} setCategoryRef={setCategoryRef} />
                        <section>
                            <button style={{ backgroundColor: color }} type='submit'>
                                <span className="material-icons">add</span>
                            </button>
                        </section>
                    </div>
                </form>
            </div>
        )
    }

    function NewNotePWA() {
        return (
            <Fragment>
                <button
                    className='add-new-note-pwa'
                    type='button'
                    onClick={() => setShowNewNotePWA(!showNewNotePWA)}
                >
                    <span className='material-icons-outlined'>{showNewNotePWA ? 'close' : 'add'}</span>
                </button>
                {showNewNotePWA && NewNoteWeb(true)}
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Toaster position="top-center" toastOptions={{
                style: {
                    backgroundColor: isDark ? '#121212' : 'none',
                    color: isDark ? '#fff' : 'none'
                }
            }} />
            {isMobile && isPWA ? NewNotePWA() : NewNoteWeb()}
        </Fragment>
    )
}
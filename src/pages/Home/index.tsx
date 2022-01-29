import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

import './styles.scss'

import photoDefault from '../../assets/images/profile-photo-default.svg'

import { NewNote } from "../../components/NewNote"
import { Note } from "../../components/Note"

import { NoteInfoContextProvider } from "../../contexts/NoteInfoContext"
import { useHome } from "../../hooks/useHome"

import { signOut } from "firebase/auth"
import { auth } from "../../services/firebase"


export function Home() {
    const { user, setUser } = useAuth()
    const { notes } = useHome()

    const [searchValue, setSearchValue] = useState('')
    const [isAsideOpen, setIsAsideOpen] = useState(false)
    const [optionsOpen, setOptionsOpen] = useState(false)

    

    return (
        <div id="home-page">
            <aside className={`home-aside aside-open-${isAsideOpen}`}>
                <section className="content">
                    <h1>Categorias</h1>
                    <ul>
                        <li><a><p>Matemática</p></a></li>
                        <li><a><p>Ciências</p></a></li>
                    </ul>
                </section>
                <button onClick={() => setIsAsideOpen(!isAsideOpen)}>
                    <span className="material-icons">{isAsideOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'}</span>
                </button>
            </aside>

            <div className="home-content">
                <header>
                    <div className="content">
                        <h1>Geral</h1>
                        <button className="user-button" onClick={() => setOptionsOpen(!optionsOpen)}>
                            <img src={user!.avatar != '' ? user!.avatar : photoDefault} alt="Profile image" />
                        </button>
                        <div className="user-options" style={{ display: optionsOpen ? 'flex' : 'none' }}>
                            <p>{user?.name}</p>
                            <button>Trocar de conta</button>
                            <button onClick={() => {
                                signOut(auth)
                                setUser(undefined)
                            }}>Sair</button>
                        </div>
                    </div>
                </header>

                <main>
                    <div className="top-container">
                        <div className="search-container">
                            <span className="material-icons">search</span>
                            <input
                                type="text"
                                maxLength={100}
                                value={searchValue}
                                onChange={event => setSearchValue(event.target.value)}
                                placeholder="Pesquisar nota..."
                            />
                        </div>
                        <a className="calendar-container">
                            <span className="date">27</span>
                            <span className="material-icons-outlined calendar">calendar_today</span>
                        </a>
                    </div>
                    <div className="notes-container">
                        <NoteInfoContextProvider>
                            <NewNote />
                            {notes.map((note, index) => {
                                if (note.text.toLowerCase().includes(searchValue)) {
                                    return <Note key={index} id={note.id} color={note.color} text={note.text} date={note.date} />
                                }
                            })}
                        </NoteInfoContextProvider>
                    </div>
                </main>
            </div>
        </div>
    )
}

import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

import './styles.scss'

import photoDefault from '../../assets/images/profile-photo-default.svg'
import { NewNote } from "../../components/NewNote"
import { Note } from "../../components/Note"

export function Home() {
    const { user } = useAuth()
    const [searchValue, setSearchValue] = useState('')
    const [isAsideOpen, setIsAsideOpen] = useState(false)

    return (
        <div id="home-page">
            <aside className={`home-aside aside-open-${isAsideOpen}`}>
                <div className="content">
                    <h1>Categorias</h1>
                    <ul>
                        <li><a><p>Matemática</p></a></li>
                        <li><a><p>Ciências</p></a></li>
                    </ul>
                </div>
                <a onClick={() => setIsAsideOpen(!isAsideOpen)}>
                    <span className="material-icons">{isAsideOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'}</span>
                </a>
            </aside>

            <div className="home-content">
                <header>
                    <div className="content">
                        <h1>Geral</h1>
                        <img src={user!.avatar != '' ? user!.avatar : photoDefault} alt="Profile image" />
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
                        <NewNote />
                        <Note color="red" date="27/01/2022" text="Exemplo de anotação" />
                    </div>
                </main>
            </div>
        </div>
    )
}

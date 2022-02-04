import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

import './styles.scss'

import { NewNote } from "../../components/NewNote"
import { Note } from "../../components/Note"
import { DatePickerComponent } from "../../components/DatePickerComponent"

import { NoteInfoContextProvider } from "../../contexts/NoteInfoContext"

import { signOut } from "firebase/auth"
import { auth, database } from "../../services/firebase"
import { clearIndexedDbPersistence } from "firebase/firestore"

import { useHome } from "../../hooks/useHome"
import { useCategories } from "../../hooks/useCategories"

import { NoteInfoType } from "../../types/hooks/useHome"
import { FilterCategoryType, FilterDateType } from "../../types/pages/Home"
import { ToggleDark } from "../../components/ToggleDark"

export function Home() {
    const { user, setUser } = useAuth()
    const { notes } = useHome()
    const { categories } = useCategories()

    const [showDatePicker, setShowDatePicker] = useState(false)

    const [filterDate, setFilterDate] = useState<FilterDateType>(null)
    const [filterCategory, setFilterCategory] = useState<FilterCategoryType>({label: 'Geral', value: null})
    const [searchValue, setSearchValue] = useState('')

    const [isAsideOpen, setIsAsideOpen] = useState(false)
    const [optionsOpen, setOptionsOpen] = useState(false)

    function handleNewDate(date: Date | null) {
        if (date) {
            setFilterDate(date)
        }
    }

    function handleFilters(note: NoteInfoType, index: number) {
        if (note.text.toLowerCase().includes(searchValue)) {
            if (note.date === filterDate?.toDateString() || note.date === null || filterDate === null) {
                if (note.category.value === filterCategory.value || filterCategory.value === null) {
                    return <Note key={index} id={note.id} color={note.color} text={note.text} date={note.date} isComplete={note.isComplete} category={note.category} />
                }
            }
        }
    }

    return (
        <div id="home-page">
            <aside className={`home-aside aside-open-${isAsideOpen}`}>
                <section className="content">
                    <ToggleDark />
                    <h1>Categorias</h1>
                    <ul>
                        <li><button type="button" onClick={() => setFilterCategory({label: 'Geral', value: null})}><p>Geral</p></button></li>
                        {categories.map((category, index) => {
                            const categoryName = category.label
                            return <li key={index}><button type="button" onClick={() => setFilterCategory(category)}><p>{categoryName}</p></button></li>
                        })}
                    </ul>
                </section>
                <button onClick={() => setIsAsideOpen(!isAsideOpen)}>
                    <span className="material-icons">{isAsideOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'}</span>
                </button>
            </aside>

            <div className="home-content">
                <header>
                    <div className="content">
                        <h1>{filterCategory.label}</h1>
                        <button className="user-button" onClick={() => setOptionsOpen(!optionsOpen)}>
                            <img src={user?.avatar} alt="Profile" />
                        </button>
                        <div className="user-options" style={{ display: optionsOpen ? 'flex' : 'none' }}>
                            <p>{user?.name}</p>
                            <button>Trocar de conta</button>
                            <button onClick={() => {
                                signOut(auth).then(() => {
                                    clearIndexedDbPersistence(database)
                                })
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
                        <div className={`calendar-container datepicker-open-${showDatePicker}`}>
                            <button type="button" className="calendar-button-container" onClick={() => setShowDatePicker(!showDatePicker)}>
                                <span className="date">{filterDate?.getDate()}</span>
                                <span className="material-icons-outlined calendar">calendar_today</span>
                            </button>
                            <button className="calendar-button-reset" style={{display: filterDate ? 'block' : 'none'}} onClick={() => setFilterDate(null)}>
                                <span className="material-icons reset-date">close</span>
                            </button>
                            <DatePickerComponent handleDate={handleNewDate} />
                        </div>
                    </div>
                    <div className="notes-container">
                        <NoteInfoContextProvider>
                            <NewNote />
                            {notes.map((note, index) => handleFilters(note, index))}
                        </NoteInfoContextProvider>
                    </div>
                </main>
            </div>
        </div>
    )
}

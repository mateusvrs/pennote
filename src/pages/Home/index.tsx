import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useHideElements } from "../../hooks/useHideElements"

import './styles.scss'

import { NewNote } from "../../components/NewNote"
import { Note } from "../../components/Note"
import { DatePickerComponent } from "../../components/DatePickerComponent"
import { ToggleDark } from "../../components/ToggleDark"
import Modal from 'react-modal'

import { NoteInfoContextProvider } from "../../contexts/NoteInfoContext"

import { signOut } from "firebase/auth"
import { auth, database } from "../../services/firebase"
import { deleteDoc, doc } from "firebase/firestore"

import { useHome } from "../../hooks/useHome"
import { useCategories } from "../../hooks/useCategories"

import { NoteInfoType } from "../../types/hooks/useHome"
import { CategoriesType } from "../../types/hooks/useCategories"
import { FilterCategoryType, FilterDateType } from "../../types/pages/Home"

export function Home() {
    const { user, setUser } = useAuth()
    const { notes } = useHome()
    const { categories } = useCategories()

    const stateShowNewNotePWA = useState(false)

    const [showDatePicker, setShowDatePicker] = useState(false)

    const [filterDate, setFilterDate] = useState<FilterDateType>(null)
    const [filterCategory, setFilterCategory] = useState<FilterCategoryType>({ label: 'Geral', value: null })
    const [searchValue, setSearchValue] = useState('')

    const [isAsideOpen, setIsAsideOpen] = useState(false)
    const [optionsOpen, setOptionsOpen] = useState(false)

    const [categoryToDelete, setCategoryToDelete] = useState<CategoriesType | null>(null)
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false)

    useHideElements({ elementId: 'date-picker-filter-div', setShowElement: setShowDatePicker })
    useHideElements({ elementId: 'home-aside', setShowElement: setIsAsideOpen })
    useHideElements({ elementId: 'user-options', setShowElement: setOptionsOpen })

    function handleNewDate(date: Date | null) {
        if (date) {
            setFilterDate(date)
        }
    }

    async function handleDeleteCategory(category: CategoriesType | null) {
        if (category) {
            await deleteDoc(doc(database, `users/${user?.id}/categories/${category.value}`)).then(() => {
                notes.forEach(note => {
                    if (note.category.value === category.value) {
                        deleteDoc(doc(database, `users/${user?.id}/notes/${note.id}`))
                    }
                })
                setShowDeleteCategoryModal(false)
            })
        } else {
            setShowDeleteCategoryModal(false)
        }
    }

    function handleFilters(note: NoteInfoType, index: number) {
        if (note.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
            if (note.date === filterDate?.toDateString() || note.date === null || filterDate === null) {
                if (note.category.value === filterCategory.value || filterCategory.value === null) {
                    return <Note key={index} id={note.id} stateShowNewNotePWA={stateShowNewNotePWA}
                        color={note.color} text={note.text} date={note.date} isComplete={note.isComplete} category={note.category} />
                }
            }
        }
    }

    return (
        <div id="home-page">
            <Modal isOpen={showDeleteCategoryModal} className='Modal'>
                <div className="container">
                    <p>Tem certeza que deseja excluir essa categoria? Todas as suas notas relacionadas também serão apagadas.</p>
                    <div className="select-container">
                        <button type='button' className='cancel' onClick={() => {
                            setCategoryToDelete(null)
                            setShowDeleteCategoryModal(false)
                        }}>
                            Cancelar
                        </button>
                        <button type='button' className='delete' onClick={() => handleDeleteCategory(categoryToDelete)}>
                            Excluir
                        </button>
                    </div>
                </div>
            </Modal>
            <aside id='home-aside' className={`home-aside-container aside-open-${isAsideOpen}`}>
                <section className="content">
                    <ToggleDark />
                    <h1>Categorias</h1>
                    <ul>
                        <li><button type="button" className="category-name-button" onClick={() => setFilterCategory({ label: 'Geral', value: null })}><p>Geral</p></button></li>
                        {categories.map((category, index) => {
                            const categoryName = category.label
                            return (
                                <li key={index}>
                                    <button type="button" className="category-name-button" onClick={() => setFilterCategory(category)}><p>{categoryName}</p></button>
                                    <button type="button" onClick={() => {
                                        setCategoryToDelete(category)
                                        setShowDeleteCategoryModal(true)
                                    }}><span className="material-icons-outlined">close</span></button>
                                </li>
                            )
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
                        <section id='user-options'>
                            <button className="user-button" onClick={() => setOptionsOpen(!optionsOpen)}>
                                <img src={user?.avatar} alt="Profile" />
                            </button>
                            <div className="user-options-container" style={{ display: optionsOpen ? 'flex' : 'none' }}>
                                <p>{user?.name}</p>
                                <button onClick={() => {
                                    signOut(auth)
                                    setUser(undefined)
                                }}>Sair</button>
                            </div>
                        </section>
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
                        <div id='date-picker-filter-div' className={`calendar-container datepicker-open-${showDatePicker}`}>
                            <button type="button" className="calendar-button-container" onClick={() => setShowDatePicker(!showDatePicker)}>
                                <span className="date">{filterDate?.getDate()}</span>
                                <span className="material-icons-outlined calendar">calendar_today</span>
                            </button>
                            <button className="calendar-button-reset" style={{ display: filterDate ? 'block' : 'none' }} onClick={() => setFilterDate(null)}>
                                <span className="material-icons reset-date">close</span>
                            </button>
                            <DatePickerComponent handleDate={handleNewDate} />
                        </div>
                    </div>
                    <div className="notes-container">
                        <NoteInfoContextProvider>
                            <NewNote stateShowNewNotePWA={stateShowNewNotePWA} />
                            {notes.map((note, index) => handleFilters(note, index))}
                        </NoteInfoContextProvider>
                    </div>
                </main>
            </div>
        </div>
    )
}

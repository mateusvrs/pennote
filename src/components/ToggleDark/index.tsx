import { doc, setDoc } from 'firebase/firestore'
import { database } from '../../services/firebase'

import { useContext } from 'react'
import { DarkContext } from '../../contexts/DarkContext'

import './styles.scss'
import { useAuth } from '../../hooks/useAuth'

export function ToggleDark() {
    const { user } = useAuth()
    const { isDark } = useContext(DarkContext)

    function handleToggleDark() {
        if (user) {
            setDoc(doc(database, `users/${user.id}`), {
                isDark: !isDark
            })
        }
        document.querySelector('body')?.classList.toggle('dark')
    }

    return (
        <label className="switch">
            <input type="checkbox" onChange={handleToggleDark} checked={isDark} />
            <span className="slider round"></span>
            <div>
                <span>🌙</span>
                <span>☀️</span>
            </div>
        </label>
    )
}
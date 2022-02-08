import { addDoc, collection } from "firebase/firestore"
import { database } from "../../../../services/firebase"

import { useAuth } from "../../../../hooks/useAuth"
import { useCategories } from "../../../../hooks/useCategories"
import { useNoteInfo } from "../../../../hooks/useNoteInfo"
import { useEffect, useState } from "react"

import CreatableSelect from 'react-select/creatable'

import { NoteCategorySelectProps, SelectedCategoryType } from "../../../../types/components/NewNote/NoteCategorySelect"

import './styles.scss'

export function NoteCategorySelect(props: NoteCategorySelectProps) {
    const { user } = useAuth()
    const { noteInfo, setNoteInfo } = useNoteInfo()
    const { color } = noteInfo

    const { categories } = useCategories()
    const [showCategories, setShowCategories] = useState(false)

    useEffect(() => {
        function handleClicks(event: MouseEvent) {
            const element = document.getElementById('creatable-section')
            const targetElement = event.target as HTMLElement

            var haveInCategory = false
            categories.forEach(({ label }) => {
                if (targetElement.innerHTML === label) {
                    haveInCategory = true
                }
            })
            
            if (!element?.contains(event.target as Node) && !haveInCategory) {
                setShowCategories(false)
            }
        }

        document.addEventListener('click', handleClicks)

        return () => {
            document.removeEventListener('click', handleClicks)
        }
    }, [setShowCategories, categories])

    async function handleCreateCategory(categoryName: string) {
        await addDoc(collection(database, `users/${user?.id}/categories`), {
            name: categoryName
        })
    }

    function handleSelectCategory(selectedCategory: SelectedCategoryType) {
        const value = selectedCategory?.value
        const label = selectedCategory?.label

        if (value && label) {
            setNoteInfo({
                ...noteInfo,
                category: {
                    value: value,
                    label: label
                }
            })
        }
    }

    return (
        <section id='creatable-section'>
            <button type="button" style={{ backgroundColor: color }} onClick={() => setShowCategories(!showCategories)}>
                <span className="material-icons-outlined">collections_bookmark</span>
            </button>
            <div className="creatable-container" style={{ display: showCategories ? 'block' : 'none' }}>
                <CreatableSelect
                    menuPlacement={props.isPWA ? 'top' : 'bottom'}
                    ref={ref => {
                        props.setCategoryRef(ref)
                    }}
                    id="creatable"
                    onCreateOption={(categoryName) => handleCreateCategory(categoryName)}
                    isClearable
                    placeholder="Select the category..."
                    options={categories}
                    onChange={handleSelectCategory}
                />
            </div>
        </section>
    )
}
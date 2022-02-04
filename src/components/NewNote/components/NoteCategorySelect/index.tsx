import { addDoc, collection } from "firebase/firestore"
import { database } from "../../../../services/firebase"

import { useAuth } from "../../../../hooks/useAuth"
import { useCategories } from "../../../../hooks/useCategories"
import { useNoteInfo } from "../../../../hooks/useNoteInfo"
import { useState } from "react"

import CreatableSelect from 'react-select/creatable'

import { NoteCategorySelectProps, SelectedCategoryType } from "../../../../types/components/NewNote/NoteCategorySelect"

import './styles.scss'

export function NoteCategorySelect(props: NoteCategorySelectProps) {
    const { user } = useAuth()
    const { noteInfo, setNoteInfo } = useNoteInfo()
    const { color } = noteInfo

    const { categories } = useCategories()
    const [showCategories, setShowCategories] = useState(false)

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
        <section>
            <button type="button" style={{ backgroundColor: color }} onClick={() => setShowCategories(!showCategories)}>
                <span className="material-icons-outlined">collections_bookmark</span>
            </button>
            <div className="creatable-container" style={{ display: showCategories ? 'block' : 'none' }}>
                <CreatableSelect
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
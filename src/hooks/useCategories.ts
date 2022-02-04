import { collection, onSnapshot, query } from "firebase/firestore"
import { database } from "../services/firebase"

import { useEffect, useState } from "react"

import { useAuth } from "./useAuth"

import { CategoriesType } from "../types/hooks/useCategories"

export function useCategories() {
    const { user } = useAuth()
    const [categories, setCategories] = useState([] as CategoriesType[])

    useEffect(() => {
        const reference = query(collection(database, `users/${user?.id}/categories`))

        const unsubscribe = onSnapshot(reference, docsSnap => {
            const newCategories = [] as CategoriesType[]
            docsSnap.docs.forEach(value => {
                const { name } = value.data()
                newCategories.push({ value: value.id, label: name })
                setCategories(newCategories)
            })
        })

        return () => {
            unsubscribe()
        }

    }, [user?.id])

    return { categories }
}
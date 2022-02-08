import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";

import { database } from "../services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { DarkContextProviderProps, DarkContextType } from "../types/contexts/DarkContext";

export const DarkContext = createContext({} as DarkContextType)

export function DarkContextProvider(props: DarkContextProviderProps) {
    const { user } = useAuth()
    const { setIsLoading } = useLoading()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        if (user) {
            const reference = doc(database, `users/${user.id}`)
            const unsubscribe = onSnapshot(reference, userRef => {
                const userData = userRef.data()
                if (userData?.isDark) {
                    setIsDark(userData.isDark)
                } else {
                    setIsDark(false)
                }
                setIsLoading(false)
            })

            return () => {
                unsubscribe()
            }
        } else {
            const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
            setIsDark(dark)
        }
    }, [user, setIsDark, setIsLoading])

    if (isDark) {
        document.querySelector('body')?.classList.add('dark')
    }

    return (
        <DarkContext.Provider value={{ isDark, setIsDark }}>
            {props.children}
        </DarkContext.Provider>
    )
}

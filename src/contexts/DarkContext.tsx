import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";

import { database } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

import { DarkContextProviderProps, DarkContextType } from "../types/contexts/DarkContext";

export const DarkContext = createContext({} as DarkContextType)

export function DarkContextProvider(props: DarkContextProviderProps) {
    const { user } = useAuth()
    const { setIsLoading } = useLoading()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        if (user) {
            getDoc(doc(database, `users/${user.id}`)).then(userRef => {
                const userData = userRef.data()
                if (userData?.isDark) {
                    setIsDark(userData.isDark)
                } else {
                    setIsDark(false)
                }
            }).then(() => {
                setIsLoading(false)
            })
        } else {
            const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
            setIsDark(dark)
        }
    }, [user, setIsDark, setIsLoading])

    console.log(isDark)
    if (isDark) {
        document.querySelector('body')?.classList.add('dark')
    }

    return (
        <DarkContext.Provider value={{ isDark, setIsDark }}>
            {props.children}
        </DarkContext.Provider>
    )
}

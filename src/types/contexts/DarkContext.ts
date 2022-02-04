import { ReactNode } from "react"

export type DarkContextType = {
    isDark: boolean
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

export type DarkContextProviderProps = {
    children: ReactNode
}
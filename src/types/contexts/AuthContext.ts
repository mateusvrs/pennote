import { OAuthCredential } from "firebase/auth"
import { ReactNode } from "react"

export type UserType = {
    id: string
    avatar: string
    name: string
}

export type AuthContextType = {
    user: UserType | undefined
    setUser: (value: UserType | undefined) => void
    SignWithGoogle: () => Promise<void>
    SignWithGitHub: () => Promise<void>
    linkAccounts: (email: string, credential: OAuthCredential) => Promise<void>
}

export type AuthContextProviderProps = {
    children: ReactNode
}
import { createContext, ReactNode, useEffect, useState } from "react"

import { GithubAuthProvider, GoogleAuthProvider, linkWithPopup, signInWithPopup } from 'firebase/auth'
import { auth } from "../services/firebase"

type User = {
    id: string
    avatar: string
}

type AuthContextType = {
    user: User | undefined
    SignWithGoogle: () => Promise<void>
    SignWithGitHub: () => Promise<void>
    LinkAccounts: (provider: GithubAuthProvider | GoogleAuthProvider) => Promise<void>
}

type ServiceToLinkType = GithubAuthProvider | GoogleAuthProvider | undefined

type ModalLinkAccountContextType = {
    serviceToLink: ServiceToLinkType
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)
export const ModalLinkAccountContext = createContext({} as ModalLinkAccountContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [serviceToLink, setServiceToLink] = useState<ServiceToLinkType>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { uid, photoURL } = user

                setUser({
                    id: uid,
                    avatar: !photoURL ? '' : photoURL
                })
            }
        })

        return () => {
            unsubscribe()
        }

    }, [])

    async function LinkAccounts(provider: GithubAuthProvider | GoogleAuthProvider) {

        await linkWithPopup(auth.currentUser!, provider).catch(error => {
            throw new Error(`Something went wrong try again: ${error}`)
        })
    }

    async function SignWithGoogle() {
        const provider = new GoogleAuthProvider();

        if (auth.currentUser) {
            console.log(auth.currentUser.providerData)
            setIsModalOpen(true)
            setServiceToLink(provider)
        } else {
            await signInWithPopup(auth, provider).then(result => {
                if (result.user) {
                    const { uid, photoURL } = result.user

                    setUser({
                        id: uid,
                        avatar: !photoURL ? '' : photoURL
                    })
                }
            }).catch(error => {
                throw new Error(`Something went wrong try again: ${error}`)
            })
        }
    }

    async function SignWithGitHub() {
        const provider = new GithubAuthProvider();

        if (auth.currentUser) {
            setIsModalOpen(true)
            setServiceToLink(provider)
        } else {
            await signInWithPopup(auth, provider).then(result => {
                if (result.user) {
                    const { uid, photoURL } = result.user

                    setUser({
                        id: uid,
                        avatar: !photoURL ? '' : photoURL
                    })
                }
            }).catch(error => {
                throw new Error(`Something went wrong try again: ${error}`)
            })
        }
    }

    return (
        <ModalLinkAccountContext.Provider value={{ serviceToLink, isModalOpen, setIsModalOpen }}>
            <AuthContext.Provider value={{ user, SignWithGoogle, SignWithGitHub, LinkAccounts }}>
                {props.children}
            </AuthContext.Provider>
        </ModalLinkAccountContext.Provider>
    )
}
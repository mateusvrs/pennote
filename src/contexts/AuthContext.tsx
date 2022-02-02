import { fetchSignInMethodsForEmail, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, linkWithCredential, OAuthCredential, OAuthProvider, sendEmailVerification, signInWithPopup, signInWithRedirect, User, UserCredential } from 'firebase/auth'
import { auth } from "../services/firebase"

import { createContext, ReactNode, useEffect, useState } from "react"
import { isMobile } from 'react-device-detect';
import toast from "react-hot-toast"

import defaultImgProfile from '../assets/images/profile-photo-default.svg'

import { useModalLinkAccount } from '../hooks/useModalLinkAccount';

type UserType = {
    id: string
    avatar: string
    name: string
}

type AuthContextType = {
    user: UserType | undefined
    setUser: (value: UserType | undefined) => void
    SignWithGoogle: () => Promise<void>
    SignWithGitHub: () => Promise<void>
    linkAccounts: (email: string, credential: OAuthCredential) => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>()
    const { setModalInfo } = useModalLinkAccount()

    useEffect(() => {
        getRedirectResult(auth).then(result => handleEmailVerification(result)).catch(error => handleAccountExistsWithDifferentCredentialError(error))

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { uid, photoURL, displayName, emailVerified } = user

                const newUser = {
                    id: uid,
                    avatar: !photoURL ? defaultImgProfile : photoURL,
                    name: !displayName ? 'Hello 😀' : displayName
                }

                if (emailVerified) {
                    setUser(newUser)
                }
            }
        })

        return () => {
            unsubscribe()
        }

    }, [auth])

    function handleEmailVerification(result: UserCredential | null) {
        const user = result?.user
        if (user) {
            const emailVerified = user.emailVerified
            if (!emailVerified) {
                sendEmailVerification(user).then(() => {
                    toast('Verify your email', { icon: '✉️' });
                })
            }
        }
    }

    function handleUserWithoutEmailVerification(currentUser: User) {
        if (currentUser.emailVerified) {
            currentUser.getIdToken(true).then(() => document.location.reload())
        } else {
            auth.currentUser?.reload().then(() => {
                if (auth.currentUser?.emailVerified) {
                    currentUser.getIdToken(true).then(() => document.location.reload())
                } else {
                    toast('Verify your email', { icon: '✉️' });
                }
            })
        }
    }

    function handleAccountExistsWithDifferentCredentialError(error: any) {
        const credential = OAuthProvider.credentialFromError(error)
        const email = error.customData?.email
        if (error.code === 'auth/account-exists-with-different-credential') {
            setModalInfo({ isModalOpen: true, email: email, credential: credential })
        }
    }

    async function linkAccounts(email: string, credential: OAuthCredential) {
        await fetchSignInMethodsForEmail(auth, email).then(result => {
            if (result.includes('google.com')) {
                SignWithGoogle().then(() => auth.currentUser ? linkWithCredential(auth.currentUser, credential) : null)
            } else if (result.includes('github.com')) {
                SignWithGitHub().then(() => auth.currentUser ? linkWithCredential(auth.currentUser, credential) : null)
            }
        })
    }

    async function SignAction(provider: GoogleAuthProvider | GithubAuthProvider) {
        if (auth.currentUser) {
            handleUserWithoutEmailVerification(auth.currentUser)
        } else {
            if (isMobile) {
                await signInWithRedirect(auth, provider)
            } else {
                await signInWithPopup(auth, provider).then(result => handleEmailVerification(result)).catch(error => handleAccountExistsWithDifferentCredentialError(error))
            }
        }
    }

    async function SignWithGoogle() {
        const provider = new GoogleAuthProvider();
        await SignAction(provider)
    }

    async function SignWithGitHub() {
        const provider = new GithubAuthProvider();
        await SignAction(provider)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, SignWithGoogle, SignWithGitHub, linkAccounts }}>
            {props.children}
        </AuthContext.Provider>
    )
}
import { OAuthCredential } from "firebase/auth"
import { ReactNode } from "react"

export type ModalLinkAccountsContextType = {
    modalInfo: ModalInfoType
    setModalInfo: (value: ModalInfoType) => void
}

export type ModalInfoType = {
    isModalOpen: boolean
    email: string | null
    credential: OAuthCredential | null
}

export type ModalLinkAccountsContextProviderProps = {
    children: ReactNode
}
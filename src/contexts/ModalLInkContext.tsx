import { OAuthCredential } from "firebase/auth";
import { createContext, ReactNode, useState } from "react";

type ModalLinkAccountsContextType = {
    modalInfo: ModalInfoType
    setModalInfo: (value: ModalInfoType) => void
}

type ModalInfoType = {
    isModalOpen: boolean
    email: string | null
    credential: OAuthCredential | null
}

type ModalLinkAccountsContextProviderProps = {
    children: ReactNode
}

export const ModalLinkAccountsContext = createContext({} as ModalLinkAccountsContextType)

export function ModalLinkAccountsContextProvider(props: ModalLinkAccountsContextProviderProps) {
    const defaultModalInfo: ModalInfoType = {
        isModalOpen: false,
        email: null,
        credential: null
    }
    const [modalInfo, setModalInfo] = useState(defaultModalInfo)

    return (
        <ModalLinkAccountsContext.Provider value={{ modalInfo, setModalInfo }}>
            {props.children}
        </ModalLinkAccountsContext.Provider>
    )
}
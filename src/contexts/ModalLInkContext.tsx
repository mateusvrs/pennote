import { createContext, useState } from "react";

import { ModalInfoType, ModalLinkAccountsContextProviderProps, ModalLinkAccountsContextType } from "../types/contexts/ModalLinkAccounts";

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
import { useContext } from "react";
import { ModalLinkAccountsContext } from "../contexts/ModalLInkContext";

export function useModalLinkAccount() {
    const context = useContext(ModalLinkAccountsContext)

    return context
}
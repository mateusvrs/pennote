import { useContext } from "react";
import { ModalLinkAccountContext } from "../contexts/AuthContext";

export function useModaLinkAccount() {
    const context = useContext(ModalLinkAccountContext)

    return context
}
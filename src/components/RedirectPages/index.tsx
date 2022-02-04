import { useAuth } from "../../hooks/useAuth"
import { useLoading } from "../../hooks/useLoading"

import { Home } from "../../pages/Home"
import { Register } from "../../pages/Register"
import { LoadingCircle } from "../LoadingCircle"

import { User } from "../../types/components/RedirectPages"

export function RedirectPages() {
    const { user } = useAuth()
    const { isLoading } = useLoading()

    function loadPageByUserState(user: User | undefined) {
        if (user) {
            return <Home />
        } else {
            if (isLoading) {
                return <LoadingCircle />
            } else {
                return <Register />
            }
        }
    }

    return loadPageByUserState(user)
}
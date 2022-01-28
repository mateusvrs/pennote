import { ButtonHTMLAttributes, ReactNode } from "react"

import './styles.scss'

type RegisterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
}

export function RegisterButton({ children, ...props }: RegisterButtonProps) {
    return (
        <button
            type="button" {...props}
        >
            {children}
        </button>
    )
}
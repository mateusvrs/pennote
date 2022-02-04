
import googleImg from '../../assets/images/google.svg'
import githubImg from '../../assets/images/github.svg'

import './styles.scss'

import { AsideRegisterLogo } from '../../components/AsideRegisterLogo'
import { RegisterButton } from '../../components/RegisterButton'
import { ModalLinkAccounts } from '../../components/ModalLinkAccounts'
import { Toaster } from 'react-hot-toast'

import { useAuth } from '../../hooks/useAuth'
import { useContext } from 'react'
import { DarkContext } from '../../contexts/DarkContext'

import { RegisterInfoType } from '../../types/pages/Register'

export function Register() {
    const { SignWithGoogle, SignWithGitHub } = useAuth()
    const { isDark } = useContext(DarkContext)

    const registerOptionsInfo: RegisterInfoType[] = [
        { image: githubImg, serviceName: 'GitHub', signFunction: SignWithGitHub },
        { image: googleImg, serviceName: 'Google', signFunction: SignWithGoogle }
    ]

    return (
        <div id="register-page">
            <Toaster position="top-center" toastOptions={{
                style: {
                    backgroundColor: isDark ? '#121212' : 'none',
                    color: isDark ? '#fff' : 'none'
                }
            }} />
            <ModalLinkAccounts />
            <main>
                <div className="container">
                    <p>Entre com sua conta</p>
                    {registerOptionsInfo.map((object, index) => {
                        return (
                            <RegisterButton key={index} className={`register-button ${object.serviceName}`} onClick={object.signFunction} >
                                <img src={object.image} alt={`${object.serviceName} logo`} />
                                {object.serviceName}
                            </RegisterButton>
                        )
                    })}
                </div>
            </main>
            <AsideRegisterLogo />
        </div>
    )
}
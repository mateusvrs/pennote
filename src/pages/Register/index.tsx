
import googleImg from '../../assets/images/google.svg'
import githubImg from '../../assets/images/github.svg'

import './styles.scss'

import { AsideRegisterLogo } from '../../components/AsideRegisterLogo'
import { RegisterButton } from '../../components/RegisterButton'
import { useAuth } from '../../hooks/useAuth'
import { ModalLinkAccounts } from '../../components/ModaLinkAccouts'

import './styles.scss'

type RegisterInfoType = {
    image: string
    serviceName: string
    signFunction: () => Promise<void>
}

export function Register() {
    const { SignWithGoogle, SignWithGitHub } = useAuth()

    const registerOptionsInfo: RegisterInfoType[] = [
        { image: githubImg, serviceName: 'GitHub', signFunction: SignWithGitHub },
        { image: googleImg, serviceName: 'Google', signFunction: SignWithGoogle }
    ]

    return (
        <div id="register-page">
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
import logoImg from '../../assets/images/logo.svg'

import './styles.scss'

export function AsideRegisterLogo() {
    return (
        <aside>
            <img src={logoImg} alt="PenNote logo" />
            <p><span className="slogan">Organize suas tarefas com elegância e facilidade</span></p>
        </aside>
    )
}
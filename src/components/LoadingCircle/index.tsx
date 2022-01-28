import logoImg from '../../assets/images/logo.svg'

import './styles.scss'

export function LoadingCircle() {
    return (
        <div className="loading-container">
            <img src={logoImg} alt="PenNote Logo" />
            <div className="loading-circle"></div>
        </div>
    )
}
import { useModaLinkAccount } from "../../hooks/useModaLinkAccount"
import { useAuth } from "../../hooks/useAuth"

import './styles.scss'

import Modal from 'react-modal'

export function ModalLinkAccounts() {
    const { linkAccounts } = useAuth()
    const { modalInfo, setModalInfo } = useModaLinkAccount()
    const { isModalOpen, email, credential } = modalInfo

    Modal.setAppElement('body')

    return (
        <Modal isOpen={isModalOpen} className='Modal' >
            <div className='container'>
                <p><span>Você já possui uma conta, deseja conecta-las?</span></p>
                <div className="select-container">
                    <button type='button' className='cancel' onClick={() => setModalInfo({ isModalOpen: false, email: null, credential: null })}>
                        Cancelar
                    </button>
                    <button type='button' className='connect' onClick={() => {
                        linkAccounts(email!, credential!)
                        setModalInfo({ isModalOpen: false, email: null, credential: null })
                    }}>
                        Conectar
                    </button>
                </div>
            </div>
        </Modal>
    )
}
import { useModalLinkAccount } from "../../hooks/useModalLinkAccount"
import { useAuth } from "../../hooks/useAuth"

import './styles.scss'

import Modal from 'react-modal'

import { ModalLinkAccountsProps } from "../../types/components/ModalLinkAccounts"

export function ModalLinkAccounts({ isTesting = false }: ModalLinkAccountsProps) {
    const { linkAccounts } = useAuth()
    const { modalInfo, setModalInfo } = useModalLinkAccount()
    if (modalInfo) {
        var { isModalOpen, email, credential } = modalInfo
    }

    const resetModalInfo = () => {
        setModalInfo({ isModalOpen: false, email: null, credential: null })
    }

    const connectAccounts = () => {
        linkAccounts(email!, credential!)
        setModalInfo({ isModalOpen: false, email: null, credential: null })
    }

    Modal.setAppElement('body')

    return (
        <Modal isOpen={isTesting ? isTesting : isModalOpen} className='Modal' >
            <div className='container'>
                <p><span>Você já possui outra conta, deseja conecta-las?</span></p>
                <div className="select-container">
                    <button type='button' className='cancel' onClick={resetModalInfo}>
                        Cancelar
                    </button>
                    <button type='button' className='connect' onClick={connectAccounts}>
                        Conectar
                    </button>
                </div>
            </div>
        </Modal>
    )
}
import { useModaLinkAccount } from "../../hooks/useModaLinkAccount"
import { useAuth } from "../../hooks/useAuth"

import './styles.scss'

import Modal from 'react-modal'

export function ModalLinkAccounts() {
    const { LinkAccounts } = useAuth()
    const { serviceToLink, isModalOpen, setIsModalOpen } = useModaLinkAccount()

    Modal.setAppElement('body')
    
    return (
        <Modal isOpen={isModalOpen} className='Modal' >
            <div className='container'>
                <p><span>Você já possui uma conta, deseja conecta-las?</span></p>
                <div className="select-container">
                    <button type='button' className='cancel' onClick={() => setIsModalOpen(false)}>
                        Cancelar
                    </button>
                    <button type='button' className='connect' onClick={() => {
                        if (serviceToLink) {
                            LinkAccounts(serviceToLink)
                            setIsModalOpen(false)
                        } else {
                            throw new Error('Something went wrong, try again later')
                        }
                    }}>
                        Conectar
                    </button>
                </div>
            </div>
        </Modal>
    )
}
import { render, screen } from '@testing-library/react';
import { ModalLinkAccounts } from '..';

describe('ModalLinkAccounts', () => {
    test('render modal component', () => {
        render(<ModalLinkAccounts isTesting />)

        const messageText = screen.getByText('Você já possui uma conta, deseja conecta-las?')
        expect(messageText).toBeInTheDocument()

        const cancelButton = screen.getByText('Cancelar')
        expect(cancelButton).toBeInTheDocument()

        const continueButton = screen.getByText('Conectar')
        expect(continueButton).toBeInTheDocument()
    })
})
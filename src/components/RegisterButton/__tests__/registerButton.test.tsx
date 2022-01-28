import { fireEvent, render, screen } from '@testing-library/react';
import { RegisterButton } from '..';

describe('RegisterButton', () => {
    test('register button render', () => {
        render(<RegisterButton>Text</RegisterButton>)

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    test('register button action', () => {
        const onClickFunction = jest.fn()
        
        render(<RegisterButton onClick={onClickFunction}>ServiceName</RegisterButton>)
    
        const serviceButton = screen.getByRole('button')
        fireEvent.click(serviceButton)
        expect(onClickFunction).toBeCalled()
      })
})
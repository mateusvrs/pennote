import { render, screen } from '@testing-library/react';

import { Register } from '..';

describe('Register', () => {
  test('register componentes render', () => {
    render(<Register />)

    const enterText = screen.getByText('Entre com sua conta')
    expect(enterText).toBeInTheDocument()

    const registerButtons = screen.getAllByRole('button')
    expect(registerButtons).toHaveLength(2)
    registerButtons.forEach(button => {
      expect(button).toHaveTextContent(/(GitHub$|Google$)/)
      expect(button).toBeInTheDocument()
    })

    const logoImg = screen.getByAltText('PenNote logo')
    expect(logoImg).toBeInTheDocument()

    const slogan = screen.getByText('Organize suas tarefas com elegância e facilidade')
    expect(slogan).toBeInTheDocument()

  })
})

import { fireEvent, render, screen } from '@testing-library/react'

import LinkButton from './LinkButton'

describe('Button Component', () => {
  it('has type property', () => {
    render(<LinkButton href='/catalog'>Test</LinkButton>)
    expect(screen.getByText('Test')).toHaveProperty('type')
  })

  it('renders correctly', () => {
    render(<LinkButton href='/catalog'>Click Me</LinkButton>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})

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

  //   it('applies className correctly', () => {
  //     render(<LinkButton className='custom-class'>Test</LinkButton>)
  //     expect(screen.getByText('Test')).toHaveClass('custom-class')
  //   })

  //   it('handles click event', () => {
  //     const handleClick = vi.fn()
  //     render(<LinkButton onClick={handleClick}>Click</LinkButton>)

  //     fireEvent.click(screen.getByText('Click'))
  //     expect(handleClick).toHaveBeenCalledTimes(1)
  //   })
})

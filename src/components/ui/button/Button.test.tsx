import { fireEvent, render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('applies className correctly', () => {
    render(<Button className='custom-class'>Test</Button>)
    expect(screen.getByText('Test')).toHaveClass('custom-class')
  })

  it('has type property', () => {
    render(<Button className='custom-class'>Test</Button>)
    expect(screen.getByText('Test')).toHaveProperty('type')
  })

  it('handles click event', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

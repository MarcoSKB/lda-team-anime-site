import { render, screen } from '@testing-library/react'

import LinkButton from './LinkButton'

describe('LinkButton Component', () => {
  it('correctly render text content', () => {
    render(<LinkButton href='/catalog'>Link text</LinkButton>)
    expect(screen.getByText('Link text')).toHaveTextContent('Link text')
  })

  it('renders correctly', () => {
    render(<LinkButton href='/catalog'>Link text</LinkButton>)
    expect(screen.getByText('Link text')).toBeInTheDocument()
  })

  it('has href property', () => {
    render(<LinkButton href='/catalog'>Link text</LinkButton>)
    expect(screen.getByText('Link text')).toHaveAttribute('href')
  })
})

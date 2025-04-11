import { render, screen } from '@testing-library/react'

import PosterCard from './PosterCard'

const mockData = {
  id: 0,
  slug: 'slug-test',
  title: 'Название постер аниме',
  img: '/images/placeholder-image.jpg',
  tags: ['Тест'],
  rating: 10,
  description: 'Описание',
}

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<PosterCard {...mockData} />)
    expect(screen.getByText('Название постер аниме')).toBeInTheDocument()
  })

  it('has hover class', () => {
    render(<PosterCard {...mockData} />)

    const cardInfo = screen.getByText('Название постер аниме').parentElement
    const card = cardInfo?.parentElement

    expect(cardInfo).toHaveClass('group-hover:opacity-100')
    expect(card).toHaveClass('group')
  })
})

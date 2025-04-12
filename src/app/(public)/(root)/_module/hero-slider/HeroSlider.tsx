import { HeroSliderList, HeroSliderWrapper } from './components'

const HeroSlider: React.FC = () => {
  return (
    <section className='relative z-0 overflow-hidden'>
      <h2 className='sr-only'>Рекомендуемые аниме тайтлы</h2>
      <HeroSliderWrapper>
        <HeroSliderList />
      </HeroSliderWrapper>
    </section>
  )
}

export default HeroSlider

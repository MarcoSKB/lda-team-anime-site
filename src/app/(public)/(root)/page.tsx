import { HeroSlider, OngoingSection } from './_components'

const page: React.FC = () => {
  return (
    <>
      <h1 className='sr-only'>
        Смотрите аниме онлайн с качественной русской озвучкой от LDA Team
      </h1>
      <HeroSlider />
      <OngoingSection />
    </>
  )
}

export default page

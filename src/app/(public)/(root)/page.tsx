import { Container } from '@/components/ui'

import { HeroSlider, OngoingSection, RecentVoiceovers } from './_module'

const page: React.FC = () => {
  return (
    <>
      <h1 className='sr-only'>
        Смотрите аниме онлайн с качественной русской озвучкой от LDA Team
      </h1>
      <HeroSlider />
      <OngoingSection />
      <Container className='px-0 md:px-4'>
        <RecentVoiceovers />
      </Container>
    </>
  )
}

export default page

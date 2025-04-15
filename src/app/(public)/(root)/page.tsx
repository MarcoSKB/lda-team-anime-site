import { Container } from '@/components/ui'

import {
  HeroSlider,
  OngoingSection,
  PostSection,
  RecentVoiceovers,
  SupportSection,
} from './_module'

const page: React.FC = () => {
  return (
    <>
      <h1 className='sr-only'>
        Смотрите аниме онлайн с качественной русской озвучкой от LDA Team
      </h1>
      <HeroSlider />
      <OngoingSection />
      <Container className='mb-8 flex flex-col gap-4 px-0 md:flex-row md:px-4 lg:gap-6'>
        <RecentVoiceovers />
        <PostSection />
      </Container>
      <SupportSection />
    </>
  )
}

export default page

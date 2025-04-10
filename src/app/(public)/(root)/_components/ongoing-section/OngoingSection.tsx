import { Container } from '@/components/ui'

import { OngoingSliderList, OngoingWrapper } from './components'

const OngoingSection: React.FC = () => {
  return (
    <section className='relative z-1 mt-[-16vh] overflow-hidden md:mt-[-21.5vh] lg:mt-[clamp(10%,-185px)]'>
      <Container className='flex flex-col gap-2'>
        <h2 className='text-xl leading-[42px] font-bold text-white'>Онгоинг</h2>
        <OngoingWrapper>
          <OngoingSliderList />
        </OngoingWrapper>
      </Container>
    </section>
  )
}

export default OngoingSection

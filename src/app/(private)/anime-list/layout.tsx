import { Footer, Header } from '@/components/module'
import { Container } from '@/components/ui'

interface Props {
  children: React.ReactNode
}

const page: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Container className='min-h-lvh md:pt-[72px]'>{children}</Container>
      <Footer />
    </>
  )
}

export default page

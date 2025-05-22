import { redirect } from 'next/navigation'

const page: React.FC = () => {
  redirect('/profile')
  return <div>payments</div>
}

export default page

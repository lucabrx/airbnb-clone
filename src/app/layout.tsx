import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import Hydrate from '@/components/Hydrate'
import RegisterModal from '@/components/modals/RegisterModal'
import ToasterProviders from '@/components/providers/ToasterProviders'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from '@/utils/getCurrentUser'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
      <ToasterProviders />
        <Hydrate>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />        
          </Hydrate>
          <div className='pb-20 pt-28'>
          {children}
          </div>
    
        </body>
    </html>
  )
}

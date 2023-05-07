import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import Hydrate from '@/components/Hydrate'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Hydrate>
          <Navbar />
        </Hydrate>
        {children}
        </body>
    </html>
  )
}

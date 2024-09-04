import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './_components/providers'
import SideBar from './_components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChadGPT',
  description: 'Chatbot assistant for giga chads',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen">
            <SideBar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css'
import Providers from './providers'

const fontSans = Inter({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Idle Games',
  description: 'Idle Games',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${fontSans.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

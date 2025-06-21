import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SGFIX',
  description: 'Plateforme intelligente de gestion des incidents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="winter">
      <head>
       <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

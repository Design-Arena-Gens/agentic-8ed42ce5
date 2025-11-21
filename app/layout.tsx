import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Viral Meme Generator',
  description: 'Generate memes based on trending Instagram content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

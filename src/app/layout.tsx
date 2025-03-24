import './globals.css'
import type { Metadata } from 'next'
import { LanguageProvider } from './context/LanguageContext'

export const metadata: Metadata = {
  title: 'Stone Games - 游戏导航网站',
  description: '发现并体验有趣的Web游戏',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-gray-50">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

'use client'

import Link from 'next/link'
import { useLanguage, Trans } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'

export default function NotFound() {
  const { language } = useLanguage()
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 text-blue-600">
            <svg className="h-32 w-32 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">404</h1>
          
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            {language === 'zh' ? '页面未找到' : 'Page Not Found'}
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg">
            {language === 'zh' 
              ? '抱歉，您访问的页面不存在或已被移除。' 
              : 'Sorry, the page you are looking for does not exist or has been removed.'}
          </p>
          
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center text-lg font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
} 
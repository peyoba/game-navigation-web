'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage, Trans } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const { language } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="text-blue-600 mr-1">S</span>tone Games
          </Link>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <Trans>首页</Trans>
            </Link>
            
            <Link href="/games" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {language === 'zh' ? '热门游戏' : 'Popular Games'}
            </Link>
            
            <Link href="#categories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {language === 'zh' ? '游戏分类' : 'Categories'}
            </Link>
            
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <Trans>管理</Trans>
            </Link>
            
            <LanguageSwitcher />
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <button 
              onClick={toggleMobileMenu}
              className="ml-4 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t mt-3 space-y-1">
            <Link href="/" 
              className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              <Trans>首页</Trans>
            </Link>
            
            <Link href="/games" 
              className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              {language === 'zh' ? '热门游戏' : 'Popular Games'}
            </Link>
            
            <Link href="#categories" 
              className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              {language === 'zh' ? '游戏分类' : 'Categories'}
            </Link>
            
            <Link href="/admin" 
              className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              <Trans>管理</Trans>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 
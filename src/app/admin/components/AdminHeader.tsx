'use client'

import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'
import LanguageSwitcher from '../../components/LanguageSwitcher'

export default function AdminHeader() {
  const { language } = useLanguage()
  
  return (
    <header className="bg-indigo-600 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="text-white font-bold text-xl">
              {language === 'zh' ? '石头游戏站 - 管理后台' : 'Stone Games - Admin'}
            </Link>
            
            <nav className="flex space-x-4">
              <Link href="/admin" className="text-indigo-100 hover:text-white px-3 py-2 rounded-md">
                {language === 'zh' ? '游戏管理' : 'Games'}
              </Link>
              <Link href="/admin/categories" className="text-indigo-100 hover:text-white px-3 py-2 rounded-md">
                {language === 'zh' ? '分类管理' : 'Categories'}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/" className="text-indigo-100 hover:text-white">
              {language === 'zh' ? '返回网站' : 'Back to Site'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 
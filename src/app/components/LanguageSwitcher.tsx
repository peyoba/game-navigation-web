'use client'

import { useLanguage } from '../context/LanguageContext'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()
  
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh')
  }
  
  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition"
    >
      {language === 'zh' ? 'English' : '中文'}
    </button>
  )
}

export default LanguageSwitcher 
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 定义语言上下文类型
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType>({
  language: 'zh', // 默认中文
  setLanguage: () => {}
})

// 提供使用上下文的hook
export const useLanguage = () => useContext(LanguageContext)

// 语言Provider组件
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // 从localStorage中获取语言设置或使用默认值
  const [language, setLanguageState] = useState('zh')
  
  // 组件挂载后从localStorage中获取保存的语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language')
      if (savedLanguage) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])
  
  // 当语言变化时保存到localStorage
  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 翻译字典
const translations: Record<string, Record<string, string>> = {
  'home.welcome': {
    zh: '欢迎来到Stone Games',
    en: 'Welcome to Stone Games'
  },
  'home.subtitle': {
    zh: '发现并畅玩精彩网页游戏',
    en: 'Discover and play amazing web games'
  },
  'home.play': {
    zh: '开始游戏',
    en: 'Play Now'
  },
  'nav.home': {
    zh: '首页',
    en: 'Home'
  },
  'nav.popular': {
    zh: '热门游戏',
    en: 'Popular'
  },
  'nav.new': {
    zh: '新游戏',
    en: 'New Games'
  },
  'site.title': {
    zh: 'Stone Games',
    en: 'Stone Games'
  },
  'games.featured': {
    zh: '精选游戏',
    en: 'Featured Games'
  },
  'categories.title': {
    zh: '游戏分类',
    en: 'Game Categories'
  },
  'footer.quickLinks': {
    zh: '快速链接',
    en: 'Quick Links'
  },
  'footer.categories': {
    zh: '游戏分类',
    en: 'Categories'
  },
  'footer.popular': {
    zh: '热门游戏',
    en: 'Popular Games'
  },
  'footer.contact': {
    zh: '联系我们',
    en: 'Contact Us'
  },
  'footer.email': {
    zh: 'info@stonegames.com',
    en: 'info@stonegames.com'
  },
  'footer.copyright': {
    zh: '© 2023 Stone Games. 保留所有权利。',
    en: '© 2023 Stone Games. All rights reserved.'
  },
  '加载中...': {
    zh: '加载中...',
    en: 'Loading...'
  },
  '游戏描述': {
    zh: '游戏描述',
    en: 'Game Description'
  },
  '相关游戏': {
    zh: '相关游戏',
    en: 'Related Games'
  },
  '游戏不存在或已被删除': {
    zh: '游戏不存在或已被删除',
    en: 'Game does not exist or has been deleted'
  },
  '返回首页': {
    zh: '返回首页',
    en: 'Back to Home'
  },
  '首页': {
    zh: '首页',
    en: 'Home'
  },
  '管理': {
    zh: '管理',
    en: 'Admin'
  },
  '版权所有': {
    zh: '版权所有',
    en: 'All Rights Reserved'
  },
  '中文名称': {
    zh: '中文名称',
    en: 'Chinese Name'
  },
  '英文名称': {
    zh: '英文名称',
    en: 'English Name'
  },
  '排序': {
    zh: '排序',
    en: 'Order'
  },
  '更新分类': {
    zh: '更新分类',
    en: 'Update Category'
  },
  '添加分类': {
    zh: '添加分类',
    en: 'Add Category'
  },
  '取消': {
    zh: '取消',
    en: 'Cancel'
  },
  '分类列表': {
    zh: '分类列表',
    en: 'Category List'
  },
  '请输入中文名称': {
    zh: '请输入中文名称',
    en: 'Please enter Chinese name'
  },
  '请输入英文名称': {
    zh: '请输入英文名称',
    en: 'Please enter English name'
  },
  '操作': {
    zh: '操作',
    en: 'Actions'
  },
  '编辑': {
    zh: '编辑',
    en: 'Edit'
  },
  '删除': {
    zh: '删除',
    en: 'Delete'
  },
  '暂无分类数据': {
    zh: '暂无分类数据',
    en: 'No categories available'
  }
}

// Trans 组件用于翻译
export const Trans = ({ id, children }: { id?: string, children?: ReactNode }) => {
  const { language } = useLanguage()
  
  if (id && translations[id]) {
    return <>{translations[id][language] || children || id}</>
  }
  
  if (typeof children === 'string') {
    // 如果是字符串直接根据当前语言显示对应文本
    const key = children as string
    if (translations[key] && translations[key][language]) {
      return <>{translations[key][language]}</>
    }
  }
  
  return <>{children || id}</>
} 
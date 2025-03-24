'use client'

import { ReactNode } from 'react'
import { useLanguage } from '../context/LanguageContext'

// 因为我们现在已经在LanguageContext中定义了Trans组件，这个文件可以重定向到那个组件
// 为了兼容性，我们保留这个文件，但是重新导出LanguageContext中的Trans组件

export { Trans as default } from '../context/LanguageContext' 
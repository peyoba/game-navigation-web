'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'
import AdminHeader from '../components/AdminHeader'
import { Category, GameFormData } from '../../types/models'
import { addGame, getAllCategories } from '../../services/gameService'
import { translateText } from '../../services/translationService'

export default function AddGamePage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [previewUrl, setPreviewUrl] = useState('')
  const [translating, setTranslating] = useState(false)
  
  // 表单状态
  const [formData, setFormData] = useState<GameFormData>({
    titleZh: '',
    titleEn: '',
    descZh: '',
    descEn: '',
    imageUrl: '',
    gameUrl: '',
    categoryId: 0,
    isActive: true
  })
  
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [submitting, setSubmitting] = useState(false)
  
  // 加载分类数据
  useEffect(() => {
    try {
      const categoryData = getAllCategories();
      setCategories(categoryData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading categories:', error);
      setLoading(false);
    }
  }, [])
  
  // 处理表单字段变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // 清除该字段的错误
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // 更新游戏链接预览
    if (name === 'gameUrl') {
      setPreviewUrl(value)
    }
  }
  
  // 处理复选框变化
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  
  // 自动翻译功能
  const handleAutoTranslate = async (sourceField: 'titleZh' | 'titleEn' | 'descZh' | 'descEn') => {
    let targetField: 'titleZh' | 'titleEn' | 'descZh' | 'descEn';
    let targetLang: 'zh' | 'en';
    
    // 确定目标字段和语言
    if (sourceField === 'titleZh') {
      targetField = 'titleEn';
      targetLang = 'en';
    } else if (sourceField === 'titleEn') {
      targetField = 'titleZh';
      targetLang = 'zh';
    } else if (sourceField === 'descZh') {
      targetField = 'descEn';
      targetLang = 'en';
    } else {
      targetField = 'descZh';
      targetLang = 'zh';
    }
    
    const sourceText = formData[sourceField];
    
    if (!sourceText || sourceText.trim() === '') {
      alert(language === 'zh' ? '请先输入需要翻译的内容' : 'Please enter content to translate first');
      return;
    }
    
    setTranslating(true);
    
    try {
      const translatedText = await translateText(sourceText, targetLang);
      
      setFormData(prev => ({
        ...prev,
        [targetField]: translatedText
      }));
      
      // 清除目标字段的错误
      if (formErrors[targetField]) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[targetField];
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Translation error:', error);
      alert(language === 'zh' ? '翻译失败，请稍后重试或手动输入' : 'Translation failed, please try again later or enter manually');
    } finally {
      setTranslating(false);
    }
  };
  
  // 表单验证
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {}
    
    if (!formData.titleZh.trim()) errors.titleZh = '请输入中文标题'
    if (!formData.titleEn.trim()) errors.titleEn = 'Please enter English title'
    if (!formData.descZh.trim()) errors.descZh = '请输入中文描述'
    if (!formData.descEn.trim()) errors.descEn = 'Please enter English description'
    
    // 图片URL变为可选，但如果提供了则必须有效
    if (formData.imageUrl && formData.imageUrl.trim() && !isValidUrl(formData.imageUrl)) {
      errors.imageUrl = language === 'zh' ? '请输入有效的图片URL' : 'Please enter a valid image URL'
    }
    
    if (!formData.gameUrl.trim()) {
      errors.gameUrl = language === 'zh' ? '请输入游戏链接' : 'Please enter game URL'
    } else if (!isValidUrl(formData.gameUrl)) {
      errors.gameUrl = language === 'zh' ? '请输入有效的游戏URL' : 'Please enter a valid game URL'
    }
    
    if (!formData.categoryId) {
      errors.categoryId = language === 'zh' ? '请选择游戏分类' : 'Please select a category'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // 检查URL是否有效
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }
  
  // 提交表单
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setSubmitting(true)
    
    try {
      // 调用添加游戏的服务
      const newGame = addGame({
        ...formData,
        categoryId: Number(formData.categoryId)
      });
      
      console.log('Game added:', newGame);
      
      // 成功添加游戏后显示提示并跳转
      alert(language === 'zh' ? '游戏添加成功！' : 'Game added successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error adding game:', error);
      alert(language === 'zh' ? '添加游戏失败，请重试！' : 'Failed to add game, please try again!');
    } finally {
      setSubmitting(false);
    }
  }
  
  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }
  
  return (
    <div>
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {language === 'zh' ? '添加新游戏' : 'Add New Game'}
          </h1>
          <Link href="/admin" className="btn-secondary">
            {language === 'zh' ? '返回' : 'Back'}
          </Link>
        </div>
        
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {language === 'zh' ? '自动翻译功能' : 'Auto Translation Feature'}
              </h3>
              <div className="mt-1 text-sm text-blue-700">
                <p>
                  {language === 'zh' 
                    ? '只需填写其中一种语言，然后点击"翻译"按钮，系统将自动为您翻译成另一种语言。' 
                    : 'Fill in just one language, then click the "Translate" button, and the system will automatically translate it into the other language for you.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 中文标题 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="titleZh" className="block text-sm font-medium text-gray-700">
                    中文标题
                  </label>
                  <button 
                    type="button" 
                    onClick={() => handleAutoTranslate('titleZh')}
                    disabled={translating || !formData.titleZh}
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 py-1 px-2 rounded disabled:opacity-50"
                  >
                    {translating ? '翻译中...' : '翻译为英文 →'}
                  </button>
                </div>
                <input
                  type="text"
                  id="titleZh"
                  name="titleZh"
                  value={formData.titleZh}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${formErrors.titleZh ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {formErrors.titleZh && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.titleZh}</p>
                )}
              </div>
              
              {/* 英文标题 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700">
                    English Title
                  </label>
                  <button 
                    type="button" 
                    onClick={() => handleAutoTranslate('titleEn')}
                    disabled={translating || !formData.titleEn}
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 py-1 px-2 rounded disabled:opacity-50"
                  >
                    {translating ? 'Translating...' : '← Translate to Chinese'}
                  </button>
                </div>
                <input
                  type="text"
                  id="titleEn"
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${formErrors.titleEn ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {formErrors.titleEn && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.titleEn}</p>
                )}
              </div>
              
              {/* 中文描述 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="descZh" className="block text-sm font-medium text-gray-700">
                    中文描述
                  </label>
                  <button 
                    type="button" 
                    onClick={() => handleAutoTranslate('descZh')}
                    disabled={translating || !formData.descZh}
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 py-1 px-2 rounded disabled:opacity-50"
                  >
                    {translating ? '翻译中...' : '翻译为英文 →'}
                  </button>
                </div>
                <textarea
                  id="descZh"
                  name="descZh"
                  rows={3}
                  value={formData.descZh}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${formErrors.descZh ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                ></textarea>
                {formErrors.descZh && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.descZh}</p>
                )}
              </div>
              
              {/* 英文描述 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="descEn" className="block text-sm font-medium text-gray-700">
                    English Description
                  </label>
                  <button 
                    type="button" 
                    onClick={() => handleAutoTranslate('descEn')}
                    disabled={translating || !formData.descEn}
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 py-1 px-2 rounded disabled:opacity-50"
                  >
                    {translating ? 'Translating...' : '← Translate to Chinese'}
                  </button>
                </div>
                <textarea
                  id="descEn"
                  name="descEn"
                  rows={3}
                  value={formData.descEn}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${formErrors.descEn ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                ></textarea>
                {formErrors.descEn && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.descEn}</p>
                )}
              </div>
            </div>
            
            {/* 图片链接 */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '图片链接 (可选)' : 'Image URL (Optional)'}
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full rounded-md border ${formErrors.imageUrl ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{formErrors.imageUrl}</p>
              )}
              {formData.imageUrl && isValidUrl(formData.imageUrl) && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">{language === 'zh' ? '图片预览:' : 'Image Preview:'}</p>
                  <img src={formData.imageUrl} alt="Preview" className="h-40 object-contain rounded-md border border-gray-200" />
                </div>
              )}
            </div>
            
            {/* 游戏链接 */}
            <div>
              <label htmlFor="gameUrl" className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '游戏链接' : 'Game URL'}
              </label>
              <input
                type="text"
                id="gameUrl"
                name="gameUrl"
                value={formData.gameUrl}
                onChange={handleChange}
                placeholder="https://example.com/game.html"
                className={`w-full rounded-md border ${formErrors.gameUrl ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.gameUrl && (
                <p className="text-red-500 text-sm mt-1">{formErrors.gameUrl}</p>
              )}
              
              {previewUrl && isValidUrl(previewUrl) && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">{language === 'zh' ? '游戏预览:' : 'Game Preview:'}</p>
                  <div className="border border-gray-200 rounded-md overflow-hidden aspect-video">
                    <iframe src={previewUrl} className="w-full h-full" title="Game Preview"></iframe>
                  </div>
                </div>
              )}
            </div>
            
            {/* 游戏分类 */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '游戏分类' : 'Game Category'}
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full rounded-md border ${formErrors.categoryId ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
              >
                <option value="0">
                  {language === 'zh' ? '-- 选择分类 --' : '-- Select Category --'}
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {language === 'zh' ? category.nameZh : category.nameEn}
                  </option>
                ))}
              </select>
              {formErrors.categoryId && (
                <p className="text-red-500 text-sm mt-1">{formErrors.categoryId}</p>
              )}
            </div>
            
            {/* 是否启用 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                {language === 'zh' ? '立即发布' : 'Publish Immediately'}
              </label>
            </div>
            
            {/* 提交按钮 */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {submitting 
                  ? (language === 'zh' ? '提交中...' : 'Submitting...') 
                  : (language === 'zh' ? '添加游戏' : 'Add Game')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 
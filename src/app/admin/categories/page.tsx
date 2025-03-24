'use client'

import { useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { useLanguage, Trans } from '../../context/LanguageContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Category } from '../../types/models'
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../../services/gameService'
import AdminHeader from '../components/AdminHeader'

export default function CategoriesPage() {
  const { language } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nameZh: '',
    nameEn: '',
    order: 0
  })
  const [formErrors, setFormErrors] = useState({
    nameZh: false,
    nameEn: false
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // 获取所有分类
        const data = getAllCategories()
        // 按照order排序
        setCategories(data.sort((a, b) => a.order - b.order))
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'order' ? parseInt(value) || 0 : value
    })
  }

  const validateForm = () => {
    const errors = {
      nameZh: !formData.nameZh.trim(),
      nameEn: !formData.nameEn.trim()
    }
    setFormErrors(errors)
    return !Object.values(errors).some(Boolean)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      if (editingId) {
        // 更新分类
        updateCategory(editingId, formData)
      } else {
        // 添加分类
        addCategory(formData)
      }
      
      // 重新获取所有分类
      const updatedCategories = getAllCategories()
      setCategories(updatedCategories.sort((a, b) => a.order - b.order))
      resetForm()
    } catch (error) {
      console.error('Error saving category:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      nameZh: '',
      nameEn: '',
      order: 0
    })
    setFormErrors({
      nameZh: false,
      nameEn: false
    })
    setEditingId(null)
  }

  const handleEdit = (category: Category) => {
    setFormData({
      nameZh: category.nameZh,
      nameEn: category.nameEn,
      order: category.order
    })
    setEditingId(category.id)
  }

  const handleDelete = (id: number) => {
    if (window.confirm(language === 'zh' ? '确定要删除此分类吗？' : 'Are you sure you want to delete this category?')) {
      try {
        deleteCategory(id)
        // 更新分类列表
        const updatedCategories = getAllCategories()
        setCategories(updatedCategories)
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AdminHeader />
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId 
              ? language === 'zh' ? '编辑分类' : 'Edit Category' 
              : language === 'zh' ? '添加新分类' : 'Add New Category'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Trans>中文名称</Trans>
                </label>
                <input
                  type="text"
                  name="nameZh"
                  value={formData.nameZh}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${formErrors.nameZh ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={language === 'zh' ? '输入中文分类名称' : 'Enter Chinese category name'}
                />
                {formErrors.nameZh && (
                  <p className="text-red-500 text-sm mt-1">
                    <Trans>请输入中文名称</Trans>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Trans>英文名称</Trans>
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${formErrors.nameEn ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={language === 'zh' ? '输入英文分类名称' : 'Enter English category name'}
                />
                {formErrors.nameEn && (
                  <p className="text-red-500 text-sm mt-1">
                    <Trans>请输入英文名称</Trans>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Trans>排序</Trans>
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
              >
                {editingId ? <Trans>更新分类</Trans> : <Trans>添加分类</Trans>}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
                >
                  <Trans>取消</Trans>
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-2xl font-bold p-6 border-b">
            <Trans>分类列表</Trans>
          </h2>
          
          {loading ? (
            <div className="text-center p-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></div>
              <p className="mt-2">
                <Trans>加载中...</Trans>
              </p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              <Trans>暂无分类数据</Trans>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Trans>中文名称</Trans>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Trans>英文名称</Trans>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Trans>排序</Trans>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Trans>操作</Trans>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.nameZh}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.nameEn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.order}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Trans>编辑</Trans>
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trans>删除</Trans>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
} 
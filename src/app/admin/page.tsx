'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import AdminHeader from './components/AdminHeader'
import { Game, Category } from '../types/models'
import { getAllGames, deleteGame } from '../services/gameService'

export default function AdminPage() {
  const { language } = useLanguage()
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)
  
  // 加载游戏数据
  useEffect(() => {
    try {
      const gamesData = getAllGames();
      setGames(gamesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading games:', error);
      setLoading(false);
    }
  }, [])
  
  // 直接删除操作（不经过确认页面）
  const handleQuickDelete = async (id: number) => {
    if (!confirm(language === 'zh' 
      ? '确定要删除这个游戏吗？此操作不可撤销。' 
      : 'Are you sure you want to delete this game? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(id);
    
    try {
      const result = deleteGame(id);
      
      if (result) {
        // 更新本地状态
        setGames(games.filter(game => game.id !== id));
        alert(language === 'zh' ? '游戏删除成功！' : 'Game deleted successfully!');
      } else {
        alert(language === 'zh' ? '删除失败，未找到游戏！' : 'Delete failed, game not found!');
      }
    } catch (error) {
      console.error('Error deleting game:', error);
      alert(language === 'zh' ? '删除游戏失败，请重试！' : 'Failed to delete game, please try again!');
    } finally {
      setDeleting(null);
    }
  }
  
  if (loading) {
    return (
      <div>
        <AdminHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">
            {language === 'zh' ? '加载中...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {language === 'zh' ? '游戏管理' : 'Game Management'}
          </h1>
          <Link href="/admin/add-game" className="btn-primary">
            {language === 'zh' ? '添加游戏' : 'Add Game'}
          </Link>
        </div>
        
        {games.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">
              {language === 'zh' ? '暂无游戏，点击添加游戏开始创建' : 'No games yet. Click Add Game to get started.'}
            </p>
            <Link href="/admin/add-game" className="btn-primary inline-block">
              {language === 'zh' ? '添加游戏' : 'Add Game'}
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'zh' ? '游戏' : 'Game'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'zh' ? '分类' : 'Category'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'zh' ? '状态' : 'Status'}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'zh' ? '操作' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {games.map(game => (
                    <tr key={game.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-14 w-14 relative">
                            <img 
                              src={game.imageUrl || 'https://via.placeholder.com/60?text=No+Image'} 
                              alt={language === 'zh' ? game.titleZh : game.titleEn}
                              className="h-14 w-14 rounded-md object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/60?text=Error'
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {language === 'zh' ? game.titleZh : game.titleEn}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {game.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {language === 'zh' ? game.category?.nameZh : game.category?.nameEn}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${game.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {game.isActive 
                            ? (language === 'zh' ? '已上线' : 'Active') 
                            : (language === 'zh' ? '已下线' : 'Inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <Link 
                          href={`/play/${game.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                          target="_blank"
                        >
                          {language === 'zh' ? '查看' : 'View'}
                        </Link>
                        <Link 
                          href={`/admin/edit-game/${game.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          {language === 'zh' ? '编辑' : 'Edit'}
                        </Link>
                        <button
                          onClick={() => handleQuickDelete(game.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={deleting === game.id}
                        >
                          {deleting === game.id 
                            ? (language === 'zh' ? '删除中...' : 'Deleting...') 
                            : (language === 'zh' ? '删除' : 'Delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
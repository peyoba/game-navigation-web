'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '../../../context/LanguageContext'
import AdminHeader from '../../components/AdminHeader'
import { Game } from '../../../types/models'

export default function DeleteGamePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { language } = useLanguage()
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  // 加载游戏数据
  useEffect(() => {
    async function fetchData() {
      try {
        // 在实际环境中，这里会从API获取数据
        // 模拟数据
        const mockGames = [
          {
            id: 1,
            titleZh: '2048',
            titleEn: '2048',
            descZh: '经典数字益智游戏，通过滑动合并相同的数字，目标是得到2048。',
            descEn: 'The classic number puzzle game where you merge tiles with the same number by sliding them. Can you reach the elusive 2048 tile?',
            imageUrl: 'https://play-lh.googleusercontent.com/g3RY-0qqhVvNj4vFqS9eZJMxOjEDmRxPGGXvqTX5nPHVqe1BGfNqpH-LZyN7pUVKKQ',
            gameUrl: 'https://play2048.co/',
            categoryId: 2,
            category: { id: 2, nameZh: '益智解谜', nameEn: 'Puzzle Games', order: 2 },
            isActive: true
          },
          {
            id: 2,
            titleZh: '贪吃蛇',
            titleEn: 'Snake',
            descZh: '控制蛇吃食物成长，不要撞到墙或自己。',
            descEn: 'Control a growing snake as it moves around the screen eating food. Be careful not to crash into walls or your own tail!',
            imageUrl: 'https://img.itch.zone/aW1nLzIyMTU1MDEucG5n/original/6vGlZe.png',
            gameUrl: 'https://playsnake.org/',
            categoryId: 1,
            category: { id: 1, nameZh: '休闲游戏', nameEn: 'Casual Games', order: 1 },
            isActive: true
          },
          {
            id: 3,
            titleZh: '超级马里奥',
            titleEn: 'Super Mario',
            descZh: '经典横版过关游戏，控制马里奥收集金币，打败怪物。',
            descEn: 'The iconic platformer where you control Mario through various levels. Jump over obstacles, collect coins, and defeat enemies.',
            imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/n/new-super-mario-bros-u-deluxe-switch/hero',
            gameUrl: 'https://supermario-game.com/',
            categoryId: 3,
            category: { id: 3, nameZh: '动作游戏', nameEn: 'Action Games', order: 3 },
            isActive: true
          }
        ]
        
        // 获取当前游戏数据
        const gameId = parseInt(params.id)
        const gameData = mockGames.find(g => g.id === gameId)
        
        if (gameData) {
          setGame(gameData)
        } else {
          setNotFound(true)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching game:', error)
        setLoading(false)
        setNotFound(true)
      }
    }
    
    fetchData()
  }, [params.id])
  
  // 处理删除游戏
  const handleDelete = async () => {
    if (!game) return
    
    setDeleting(true)
    
    try {
      // 在实际应用中，这里会是API调用
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Game deleted:', game.id)
      
      // 模拟成功并跳转
      alert(language === 'zh' ? '游戏删除成功！' : 'Game deleted successfully!')
      router.push('/admin')
    } catch (error) {
      console.error('Error deleting game:', error)
      alert(language === 'zh' ? '删除游戏失败，请重试！' : 'Failed to delete game, please try again!')
    } finally {
      setDeleting(false)
    }
  }
  
  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }
  
  if (notFound) {
    return (
      <div>
        <AdminHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'zh' ? '游戏未找到' : 'Game Not Found'}
          </h1>
          <Link href="/admin" className="btn-primary">
            {language === 'zh' ? '返回游戏管理' : 'Back to Game Management'}
          </Link>
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
            {language === 'zh' ? '删除游戏' : 'Delete Game'}
          </h1>
          <Link href="/admin" className="btn-secondary">
            {language === 'zh' ? '返回' : 'Back'}
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold mb-4">
              {language === 'zh' 
                ? `确定要删除游戏 "${game?.titleZh}"?` 
                : `Are you sure you want to delete "${game?.titleEn}"?`}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {language === 'zh' 
                ? '此操作不可撤销。删除后，该游戏将无法恢复。' 
                : 'This action cannot be undone. Once deleted, the game cannot be recovered.'}
            </p>
            
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md"
                disabled={deleting}
              >
                {deleting
                  ? (language === 'zh' ? '删除中...' : 'Deleting...')
                  : (language === 'zh' ? '确认删除' : 'Confirm Delete')}
              </button>
              
              <Link href="/admin" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md">
                {language === 'zh' ? '取消' : 'Cancel'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* 游戏详情 */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-medium mb-4">
            {language === 'zh' ? '游戏详情:' : 'Game Details:'}
          </h3>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img 
                src={game?.imageUrl} 
                alt={language === 'zh' ? game?.titleZh : game?.titleEn} 
                className="w-full h-auto max-h-60 object-cover rounded-md" 
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/150?text=Error'
                }}
              />
            </div>
            
            <div className="md:w-2/3 md:pl-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600">
                  {language === 'zh' ? '中文标题:' : 'Chinese Title:'}
                </div>
                <div className="font-medium">{game?.titleZh}</div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600">
                  {language === 'zh' ? '英文标题:' : 'English Title:'}
                </div>
                <div className="font-medium">{game?.titleEn}</div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600">
                  {language === 'zh' ? '分类:' : 'Category:'}
                </div>
                <div className="font-medium">
                  {language === 'zh' ? game?.category?.nameZh : game?.category?.nameEn}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600">
                  {language === 'zh' ? '状态:' : 'Status:'}
                </div>
                <div className={`font-medium ${game?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {game?.isActive 
                    ? (language === 'zh' ? '已上线' : 'Active') 
                    : (language === 'zh' ? '已下线' : 'Inactive')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage, Trans } from '../context/LanguageContext'
import { getAllGames, getAllCategories } from '../services/gameService'
import { Game, Category } from '../types/models'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function GamesPage() {
  const { language } = useLanguage()
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const gamesData = await getAllGames()
        const categoriesData = await getAllCategories()
        
        setGames(gamesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 过滤游戏列表
  const filteredGames = games.filter(game => {
    // 根据分类筛选
    const matchCategory = !activeCategory || game.categoryId === activeCategory
    
    // 根据搜索词筛选
    const titleZh = game.titleZh.toLowerCase()
    const titleEn = game.titleEn.toLowerCase()
    const term = searchTerm.toLowerCase()
    const matchSearch = !searchTerm || titleZh.includes(term) || titleEn.includes(term)
    
    return matchCategory && matchSearch
  })

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {language === 'zh' ? '所有游戏' : 'All Games'}
          </h1>
          <p className="text-gray-600">
            {language === 'zh' 
              ? '浏览我们的游戏库，找到您喜欢的游戏' 
              : 'Browse our game library and find your favorite games'}
          </p>
        </div>
        
        {/* 筛选工具栏 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索游戏...' : 'Search games...'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              <button
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeCategory === null 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(null)}
              >
                {language === 'zh' ? '全部' : 'All'}
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeCategory === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {language === 'zh' ? category.nameZh : category.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg text-gray-700">
              <Trans>加载中...</Trans>
            </p>
          </div>
        ) : (
          <>
            {filteredGames.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mt-4">
                  {language === 'zh' ? '没有找到游戏' : 'No Games Found'}
                </h3>
                <p className="text-gray-500 mt-2">
                  {language === 'zh' 
                    ? '尝试更改您的筛选条件或搜索词' 
                    : 'Try changing your filters or search term'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <Link key={game.id} href={`/play/${game.id}`} className="group block">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col border border-gray-100">
                      <div className="h-40 overflow-hidden relative">
                        <img 
                          src={game.imageUrl || 'https://via.placeholder.com/300x200?text=Game'} 
                          alt={language === 'zh' ? game.titleZh : game.titleEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-3 text-white">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                              {language === 'zh' ? '开始游戏' : 'Play Now'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-1 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {language === 'zh' ? game.titleZh : game.titleEn}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {game.category && (language === 'zh' ? game.category.nameZh : game.category.nameEn)}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-auto">
                          {language === 'zh' ? game.descZh : game.descEn}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
} 
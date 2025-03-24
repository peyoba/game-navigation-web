'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage, Trans } from './context/LanguageContext'
import { getAllGames, getActiveGames, getAllCategories } from './services/gameService'
import { Game, Category } from './types/models'
import Header from './components/Header'
import Footer from './components/Footer'

export default function HomePage() {
  const { language } = useLanguage()
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // 获取游戏数据和分类
        const gamesData = await getActiveGames()
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

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg text-gray-700">
              <Trans>加载中...</Trans>
            </p>
          </div>
        ) : (
          <>
            {/* 英雄区域 */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden shadow-xl mb-12">
              <div className="flex flex-col md:flex-row items-center p-6 md:p-10">
                <div className="w-full md:w-1/2 text-white mb-6 md:mb-0">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    <Trans id="home.welcome" />
                  </h1>
                  <p className="text-lg md:text-xl mb-6 opacity-90">
                    <Trans id="home.subtitle" />
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="#popular-games" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                      <Trans id="home.play" />
                    </Link>
                    {categories.length > 0 && (
                      <Link href="#categories" className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                        {language === 'zh' ? '浏览分类' : 'Browse Categories'}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <img 
                    src="https://img.freepik.com/free-vector/game-design-concept-illustration_114360-1255.jpg" 
                    alt="Game illustration" 
                    className="rounded-lg max-w-full h-auto shadow-lg transform transition-transform hover:scale-105"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              </div>
            </section>

            {/* 热门游戏 */}
            <section className="mb-12" id="popular-games">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {language === 'zh' ? '热门游戏' : 'Popular Games'}
                </h2>
                {games.length > 4 && (
                  <Link href="/games" className="text-blue-600 hover:text-blue-800 flex items-center">
                    {language === 'zh' ? '查看全部' : 'View All'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.slice(0, 4).map((game) => (
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
            </section>

            {/* 游戏分类 */}
            <section className="mb-12" id="categories">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  {language === 'zh' ? '游戏分类' : 'Game Categories'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => {
                  const categoryGames = games.filter(game => game.categoryId === category.id)
                  return (
                    <div key={category.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg text-gray-800">
                            {language === 'zh' ? category.nameZh : category.nameEn}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                            {language === 'zh' 
                              ? `${categoryGames.length} 个游戏` 
                              : `${categoryGames.length} games`}
                          </span>
                        </div>
                        
                        <ul className="space-y-3 mb-4">
                          {categoryGames.slice(0, 3).map(game => (
                            <li key={game.id} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                              <Link href={`/play/${game.id}`} className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {language === 'zh' ? game.titleZh : game.titleEn}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        
                        {categoryGames.length > 3 && (
                          <div className="text-center">
                            <Link href={`/category/${category.id}`} className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center">
                              {language === 'zh' ? '查看全部' : 'View All'}
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

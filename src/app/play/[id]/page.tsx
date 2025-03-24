'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage, Trans } from '../../context/LanguageContext'
import { getGameById, getActiveGames } from '../../services/gameService'
import { Game } from '../../types/models'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function PlayGamePage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [game, setGame] = useState<Game | null>(null)
  const [relatedGames, setRelatedGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const id = Number(params.id)
        
        if (isNaN(id)) {
          router.push('/')
          return
        }
        
        const gameData = getGameById(id)
        if (!gameData) {
          router.push('/')
          return
        }
        
        setGame(gameData)
        
        // 获取同一分类的其他游戏作为相关游戏
        const allActiveGames = getActiveGames()
        const filtered = allActiveGames.filter(g => 
          g.id !== id && g.categoryId === gameData.categoryId
        ).slice(0, 3)
        
        setRelatedGames(filtered)
      } catch (error) {
        console.error('Error fetching game:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, router])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg"><Trans>加载中...</Trans></p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!game) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="mb-6 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-xl mb-6"><Trans>游戏不存在或已被删除</Trans></p>
            <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <Trans>返回首页</Trans>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      {!isFullscreen && <Header />}
      <main className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'container mx-auto px-4 py-8'}`}>
        {!isFullscreen && (
          <>
            <div className="flex flex-wrap items-center mb-6">
              <Link href="/" className="flex items-center mr-4 mb-2 text-blue-600 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <Trans>返回首页</Trans>
              </Link>
            </div>
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                {language === 'zh' ? game.titleZh : game.titleEn}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {game.category && (language === 'zh' ? game.category.nameZh : game.category.nameEn)}
              </div>
            </div>
          </>
        )}
        
        <div className={`relative ${isFullscreen ? 'h-full w-full' : 'aspect-video rounded-lg overflow-hidden shadow-lg mb-8 border border-gray-200'}`}>
          <iframe 
            src={game.gameUrl} 
            className="w-full h-full border-0"
            title={language === 'zh' ? game.titleZh : game.titleEn}
            allowFullScreen
          ></iframe>
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {!isFullscreen && (
              <Link 
                href="/"
                className="bg-blue-500 bg-opacity-70 text-white p-2 rounded hover:bg-opacity-100 transition-all md:hidden"
                aria-label="Back to Home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            )}
            <button 
              onClick={toggleFullscreen}
              className="bg-black bg-opacity-70 text-white p-2 rounded hover:bg-opacity-100 transition-all"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              )}
            </button>
          </div>
          
          {isFullscreen && (
            <button 
              onClick={() => router.push('/')}
              className="absolute top-4 left-4 bg-blue-500 bg-opacity-70 text-white p-2 rounded hover:bg-opacity-100 transition-all"
              aria-label="Back to Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          )}
        </div>
        
        {!isFullscreen && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Trans>游戏描述</Trans>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {language === 'zh' ? game.descZh : game.descEn}
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-center md:justify-start">
                <button 
                  onClick={toggleFullscreen}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                  {language === 'zh' ? '全屏游戏' : 'Fullscreen Mode'}
                </button>
              </div>
            </div>
            
            {relatedGames.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <Trans>相关游戏</Trans>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedGames.map((relatedGame) => (
                    <Link key={relatedGame.id} href={`/play/${relatedGame.id}`} className="block">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={relatedGame.imageUrl || 'https://via.placeholder.com/300x200?text=Game'} 
                            alt={language === 'zh' ? relatedGame.titleZh : relatedGame.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1 text-gray-800">
                            {language === 'zh' ? relatedGame.titleZh : relatedGame.titleEn}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {language === 'zh' ? relatedGame.descZh : relatedGame.descEn}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      {!isFullscreen && <Footer />}
    </>
  )
} 
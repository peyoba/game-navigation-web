'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'
import Trans from '../../components/Trans'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Game } from '../../types/models'
import { getGameById } from '../../services/gameService'

export default function GamePage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    try {
      const gameId = parseInt(params.id)
      const gameData = getGameById(gameId);
      setGame(gameData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching game:', error);
      setLoading(false);
    }
  }, [params.id])
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }
  
  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold mb-4">
              {language === 'zh' ? '游戏未找到' : 'Game not found'}
            </h1>
            <Link href="/" className="btn-primary">
              <Trans id="nav.home" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="card">
            {/* Game Title */}
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold mb-2">
                {language === 'en' ? game.titleEn : game.titleZh}
              </h1>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {language === 'en' ? game.category?.nameEn : game.category?.nameZh}
                </span>
              </div>
            </div>
            
            {/* Game Window */}
            <div className="aspect-video bg-gray-100">
              <iframe
                src={game.gameUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Game Info */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">
                <Trans id="game.about" />
              </h2>
              
              <div className="mb-4">
                <img 
                  src={game.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={language === 'en' ? game.titleEn : game.titleZh} 
                  className="w-full max-w-md h-auto rounded-lg shadow-md mb-4"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image'
                  }}
                />
              </div>
              
              <p className="text-gray-600 mb-6">
                {language === 'en' ? game.descEn : game.descZh}
              </p>
              
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="btn-secondary"
                >
                  <Trans id="game.back" />
                </Link>
                
                <Link
                  href={`/play/${game.id}`}
                  className="btn-primary"
                >
                  {language === 'zh' ? '全屏游戏' : 'Play Fullscreen'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 
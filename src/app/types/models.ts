// 游戏分类
export interface Category {
  id: number
  nameZh: string
  nameEn: string
  order: number
}

// 游戏
export interface Game {
  id: number
  titleZh: string
  titleEn: string
  descZh: string
  descEn: string
  imageUrl?: string
  gameUrl: string
  categoryId: number
  category?: Category
  isActive: boolean
}

// 游戏表单数据
export interface GameFormData {
  titleZh: string
  titleEn: string
  descZh: string
  descEn: string
  imageUrl?: string
  gameUrl: string
  categoryId: number
  isActive: boolean
} 
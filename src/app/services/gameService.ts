import { Game, Category, GameFormData } from '../types/models';

// 初始游戏数据
const initialGames: Game[] = [
  {
    id: 1,
    titleZh: '2048',
    titleEn: '2048',
    descZh: '经典数字益智游戏，通过滑动合并相同的数字，目标是得到2048。',
    descEn: 'The classic number puzzle game where you merge tiles with the same number by sliding them. Can you reach the elusive 2048 tile?',
    imageUrl: 'https://play-lh.googleusercontent.com/g3RY-0qqhVvNj4vFqS9eZJMxOjEDmRxPGGXvqTX5nPHVqe1BGfNqpH-LZyN7pUVKKQ',
    gameUrl: 'https://htmlgames.github.io/htmlgames/games/2048/index.html',
    categoryId: 2,
    isActive: true
  },
  {
    id: 2,
    titleZh: '贪吃蛇',
    titleEn: 'Snake',
    descZh: '控制蛇吃食物成长，不要撞到墙或自己。',
    descEn: 'Control a growing snake as it moves around the screen eating food. Be careful not to crash into walls or your own tail!',
    imageUrl: 'https://img.itch.zone/aW1nLzIyMTU1MDEucG5n/original/6vGlZe.png',
    gameUrl: 'https://htmlgames.github.io/htmlgames/games/snake/index.html',
    categoryId: 1,
    isActive: true
  },
  {
    id: 3,
    titleZh: '超级马里奥',
    titleEn: 'Super Mario',
    descZh: '经典横版过关游戏，控制马里奥收集金币，打败怪物。',
    descEn: 'The iconic platformer where you control Mario through various levels. Jump over obstacles, collect coins, and defeat enemies.',
    imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/n/new-super-mario-bros-u-deluxe-switch/hero',
    gameUrl: 'https://supermarioemulator.com/mario.php',
    categoryId: 3,
    isActive: true
  }
];

// 初始分类数据
const initialCategories: Category[] = [
  { id: 1, nameZh: '休闲游戏', nameEn: 'Casual Games', order: 1 },
  { id: 2, nameZh: '益智解谜', nameEn: 'Puzzle Games', order: 2 },
  { id: 3, nameZh: '动作游戏', nameEn: 'Action Games', order: 3 }
];

// 初始化本地存储
const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem('games')) {
    localStorage.setItem('games', JSON.stringify(initialGames));
  }
  
  if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify(initialCategories));
  }
};

// 获取所有游戏
export const getAllGames = (): Game[] => {
  if (typeof window === 'undefined') return initialGames;
  
  initLocalStorage();
  const games = JSON.parse(localStorage.getItem('games') || '[]');
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  
  // 为每个游戏添加完整的分类信息
  return games.map((game: Game) => {
    const category = categories.find((c: Category) => c.id === game.categoryId);
    return { ...game, category };
  });
};

// 获取活跃的游戏（isActive为true）
export const getActiveGames = (): Game[] => {
  const games = getAllGames();
  return games.filter(game => game.isActive);
};

// 根据ID获取游戏
export const getGameById = (id: number): Game | null => {
  const games = getAllGames();
  return games.find(game => game.id === id) || null;
};

// 添加新游戏
export const addGame = (gameData: GameFormData): Game => {
  if (typeof window === 'undefined') throw new Error('Cannot add game on server side');
  
  initLocalStorage();
  const games = JSON.parse(localStorage.getItem('games') || '[]');
  
  // 生成新ID（取最大ID + 1）
  const newId = games.length > 0 ? Math.max(...games.map((g: Game) => g.id)) + 1 : 1;
  
  const newGame: Game = {
    ...gameData,
    id: newId
  };
  
  games.push(newGame);
  localStorage.setItem('games', JSON.stringify(games));
  
  return newGame;
};

// 更新游戏
export const updateGame = (id: number, gameData: GameFormData): Game | null => {
  if (typeof window === 'undefined') throw new Error('Cannot update game on server side');
  
  initLocalStorage();
  const games = JSON.parse(localStorage.getItem('games') || '[]');
  const index = games.findIndex((g: Game) => g.id === id);
  
  if (index === -1) return null;
  
  const updatedGame: Game = {
    ...games[index],
    ...gameData
  };
  
  games[index] = updatedGame;
  localStorage.setItem('games', JSON.stringify(games));
  
  return updatedGame;
};

// 删除游戏
export const deleteGame = (id: number): boolean => {
  if (typeof window === 'undefined') throw new Error('Cannot delete game on server side');
  
  initLocalStorage();
  const games = JSON.parse(localStorage.getItem('games') || '[]');
  const updatedGames = games.filter((g: Game) => g.id !== id);
  
  if (updatedGames.length === games.length) return false;
  
  localStorage.setItem('games', JSON.stringify(updatedGames));
  return true;
};

// 获取所有分类
export const getAllCategories = (): Category[] => {
  if (typeof window === 'undefined') return initialCategories;
  
  initLocalStorage();
  return JSON.parse(localStorage.getItem('categories') || '[]');
};

// 根据ID获取分类
export const getCategoryById = (id: number): Category | null => {
  const categories = getAllCategories();
  return categories.find(category => category.id === id) || null;
};

// 添加新分类
export const addCategory = (categoryData: Omit<Category, 'id'>): Category => {
  if (typeof window === 'undefined') throw new Error('Cannot add category on server side');
  
  initLocalStorage();
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  
  // 生成新ID（取最大ID + 1）
  const newId = categories.length > 0 ? Math.max(...categories.map((c: Category) => c.id)) + 1 : 1;
  
  const newCategory: Category = {
    ...categoryData,
    id: newId
  };
  
  categories.push(newCategory);
  localStorage.setItem('categories', JSON.stringify(categories));
  
  return newCategory;
};

// 更新分类
export const updateCategory = (id: number, categoryData: Partial<Category>): Category | null => {
  if (typeof window === 'undefined') throw new Error('Cannot update category on server side');
  
  initLocalStorage();
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  const index = categories.findIndex((c: Category) => c.id === id);
  
  if (index === -1) return null;
  
  const updatedCategory: Category = {
    ...categories[index],
    ...categoryData
  };
  
  categories[index] = updatedCategory;
  localStorage.setItem('categories', JSON.stringify(categories));
  
  return updatedCategory;
};

// 删除分类
export const deleteCategory = (id: number): boolean => {
  if (typeof window === 'undefined') throw new Error('Cannot delete category on server side');
  
  initLocalStorage();
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  const updatedCategories = categories.filter((c: Category) => c.id !== id);
  
  if (updatedCategories.length === categories.length) return false;
  
  localStorage.setItem('categories', JSON.stringify(updatedCategories));
  return true;
}; 
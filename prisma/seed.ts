import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 创建游戏分类
  const casualCategory = await prisma.category.create({
    data: {
      nameZh: '休闲游戏',
      nameEn: 'Casual Games',
      order: 1
    }
  })

  const puzzleCategory = await prisma.category.create({
    data: {
      nameZh: '益智解谜',
      nameEn: 'Puzzle Games',
      order: 2
    }
  })

  const actionCategory = await prisma.category.create({
    data: {
      nameZh: '动作游戏',
      nameEn: 'Action Games',
      order: 3
    }
  })

  // 创建游戏
  await prisma.game.create({
    data: {
      titleZh: '2048',
      titleEn: '2048',
      descZh: '经典数字益智游戏，通过滑动合并相同的数字，目标是得到2048。',
      descEn: 'Classic number puzzle game, merge same numbers by sliding, aim to get 2048.',
      imageUrl: 'https://play-lh.googleusercontent.com/g3RY-0qqhVvNj4vFqS9eZJMxOjEDmRxPGGXvqTX5nPHVqe1BGfNqpH-LZyN7pUVKKQ',
      gameUrl: 'https://play2048.co/',
      categoryId: puzzleCategory.id,
      isActive: true
    }
  })

  await prisma.game.create({
    data: {
      titleZh: '贪吃蛇',
      titleEn: 'Snake',
      descZh: '控制蛇吃食物成长，不要撞到墙或自己。',
      descEn: 'Control the snake to eat food and grow, avoid hitting walls or yourself.',
      imageUrl: 'https://img.itch.zone/aW1nLzIyMTU1MDEucG5n/original/6vGlZe.png',
      gameUrl: 'https://playsnake.org/',
      categoryId: casualCategory.id,
      isActive: true
    }
  })

  await prisma.game.create({
    data: {
      titleZh: '超级马里奥',
      titleEn: 'Super Mario',
      descZh: '经典横版过关游戏，控制马里奥收集金币，打败怪物。',
      descEn: 'Classic platformer, control Mario to collect coins and defeat monsters.',
      imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/n/new-super-mario-bros-u-deluxe-switch/hero',
      gameUrl: 'https://supermario-game.com/',
      categoryId: actionCategory.id,
      isActive: true
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
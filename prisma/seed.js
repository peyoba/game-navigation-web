const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create categories
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

  // Create games
  await prisma.game.create({
    data: {
      titleZh: '2048',
      titleEn: '2048',
      descZh: '经典数字益智游戏，通过滑动合并相同的数字，目标是得到2048。',
      descEn: 'The classic number puzzle game where you merge tiles with the same number by sliding them. Can you reach the elusive 2048 tile? Challenge your brain with this addictive puzzle!',
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
      descEn: 'Control a growing snake as it moves around the screen eating food. Be careful not to crash into walls or your own tail! A simple yet challenging classic that never gets old.',
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
      descEn: 'The iconic platformer where you control Mario through various levels. Jump over obstacles, collect coins, and defeat enemies as you try to save the princess. Experience the game that defined a genre!',
      imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/n/new-super-mario-bros-u-deluxe-switch/hero',
      gameUrl: 'https://supermario-game.com/',
      categoryId: actionCategory.id,
      isActive: true
    }
  })

  console.log('Database has been seeded with example data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
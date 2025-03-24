/**
 * 翻译服务 - 使用模拟翻译API
 */

// 简单的文本翻译API
export async function translateText(text: string, targetLang: 'zh' | 'en'): Promise<string> {
  if (!text || text.trim() === '') {
    return '';
  }
  
  try {
    // 确定源语言和目标语言
    const sourceLang = targetLang === 'zh' ? 'en' : 'zh';
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 常用游戏术语中英文对照
    const translations: Record<string, string> = {
      // 中文 -> 英文
      '游戏': 'Game',
      '益智': 'Puzzle',
      '解谜': 'Puzzle',
      '休闲': 'Casual',
      '动作': 'Action',
      '冒险': 'Adventure',
      '策略': 'Strategy',
      '角色扮演': 'RPG',
      '射击': 'Shooter',
      '格斗': 'Fighting',
      '竞速': 'Racing',
      '模拟': 'Simulation',
      '体育': 'Sports',
      '音乐': 'Music',
      '卡牌': 'Card',
      '桌游': 'Board Game',
      '经典': 'Classic',
      '流行': 'Popular',
      '热门': 'Popular',
      '新游戏': 'New Game',
      '多人': 'Multiplayer',
      '单人': 'Single Player',
      '贪吃蛇': 'Snake',
      '控制': 'Control',
      '食物': 'Food',
      '撞到': 'Crash into',
      '墙': 'Wall',
      '成长': 'Grow',
      '超级马里奥': 'Super Mario',
      '横版': 'Platform',
      '过关': 'Level',
      '收集': 'Collect',
      '金币': 'Coins',
      '怪物': 'Monsters',
      '通过': 'Through',
      '滑动': 'Sliding',
      '合并': 'Merge',
      '相同': 'Same',
      '数字': 'Numbers',
      '目标': 'Goal',
      
      // 英文 -> 中文
      'Game': '游戏',
      'Puzzle': '益智解谜',
      'Casual': '休闲',
      'Action': '动作',
      'Adventure': '冒险',
      'Strategy': '策略',
      'RPG': '角色扮演',
      'Shooter': '射击',
      'Fighting': '格斗',
      'Racing': '竞速',
      'Simulation': '模拟',
      'Sports': '体育',
      'Music': '音乐',
      'Card': '卡牌',
      'Board Game': '桌游',
      'Classic': '经典',
      'Popular': '热门',
      'New Game': '新游戏',
      'Multiplayer': '多人',
      'Single Player': '单人',
      'Snake': '贪吃蛇',
      'Control': '控制',
      'Food': '食物',
      'Crash into': '撞到',
      'Wall': '墙',
      'Grow': '成长',
      'Super Mario': '超级马里奥',
      'Platform': '横版',
      'Level': '关卡',
      'Collect': '收集',
      'Coins': '金币',
      'Monsters': '怪物',
      'Through': '通过',
      'Sliding': '滑动',
      'Merge': '合并',
      'Same': '相同',
      'Numbers': '数字',
      'Goal': '目标',
    };
    
    // 简单的示例翻译逻辑
    if (targetLang === 'en' && /[\u4e00-\u9fa5]/.test(text)) {
      // 中文转英文 - 实际应用中应该使用真实的翻译API
      if (text === '2048') {
        return '2048';
      } else if (text.includes('贪吃蛇')) {
        return 'Snake - Control a growing snake as it moves around the screen eating food. Be careful not to crash into walls or your own tail!';
      } else if (text.includes('超级马里奥')) {
        return 'Super Mario - The iconic platformer where you control Mario through various levels. Jump over obstacles, collect coins, and defeat enemies.';
      } else if (text.includes('经典数字益智游戏')) {
        return 'The classic number puzzle game where you merge tiles with the same number by sliding them. Can you reach the elusive 2048 tile?';
      } else if (text.includes('控制蛇')) {
        return 'Control a growing snake as it moves around the screen eating food. Be careful not to crash into walls or your own tail!';
      } else if (text.includes('经典横版过关')) {
        return 'The iconic platformer where you control Mario through various levels. Jump over obstacles, collect coins, and defeat enemies.';
      } else {
        // 尝试翻译文本
        let result = text;
        // 按照字符长度排序，先处理较长的词汇
        const zhKeys = Object.keys(translations)
          .filter(key => /[\u4e00-\u9fa5]/.test(key))
          .sort((a, b) => b.length - a.length);
          
        for (const key of zhKeys) {
          result = result.replace(new RegExp(key, 'g'), translations[key]);
        }
        
        return result;
      }
    } else if (targetLang === 'zh' && !/[\u4e00-\u9fa5]/.test(text)) {
      // 英文转中文 - 实际应用中应该使用真实的翻译API
      if (text === '2048') {
        return '2048';
      } else if (text.includes('Snake')) {
        return '贪吃蛇 - 控制蛇吃食物成长，不要撞到墙或自己。';
      } else if (text.includes('Super Mario')) {
        return '超级马里奥 - 经典横版过关游戏，控制马里奥收集金币，打败怪物。';
      } else if (text.includes('classic number puzzle')) {
        return '经典数字益智游戏，通过滑动合并相同的数字，目标是得到2048。';
      } else if (text.includes('Control a growing snake')) {
        return '控制蛇吃食物成长，不要撞到墙或自己。';
      } else if (text.includes('iconic platformer')) {
        return '经典横版过关游戏，控制马里奥收集金币，打败怪物。';
      } else {
        // 尝试翻译文本
        let result = text;
        // 按照字符长度排序，先处理较长的词汇
        const enKeys = Object.keys(translations)
          .filter(key => !/[\u4e00-\u9fa5]/.test(key))
          .sort((a, b) => b.length - a.length);
          
        for (const key of enKeys) {
          result = result.replace(new RegExp(key, 'gi'), translations[key]);
        }
        
        return result;
      }
    }
    
    // 如果没有匹配到任何规则，返回原文
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // 出错时返回原文
  }
} 
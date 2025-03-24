# Stone Games - 游戏导航网站

Stone Games是一个现代的游戏导航网站，提供各类网页游戏的聚合和导航服务，支持中英文双语界面。

## 功能特点

- 游戏分类浏览和搜索
- 游戏详情页面展示
- 内嵌iframe游戏体验
- 完整的管理后台
  - 游戏管理（添加、编辑、删除）
  - 分类管理
- 多语言支持（中文/英文）

## 技术栈

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Context API (语言切换)

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/peyoba/game-navigation-web.git
cd game-navigation-web
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:3000`

## 部署到GitHub Pages

1. 添加GitHub仓库
```bash
git remote add origin https://github.com/peyoba/game-navigation-web.git
git push -u origin main
```

2. 设置GitHub Pages
   - 在GitHub仓库页面，进入Settings > Pages
   - 选择Deploy from a branch，然后选择main分支和/docs文件夹
   - 点击Save

## 部署到自定义域名 (aistone.org)

1. 构建生产环境
```bash
npm run build
```

2. 将`.next`目录和以下文件上传到您的网站服务器:
   - `package.json`
   - `next.config.js`
   - `public/`目录
   
3. 在服务器上安装依赖并启动应用:
```bash
npm install --production
npm run start
```

4. 配置域名
   - 在您的域名服务商控制面板中，将aistone.org指向您的服务器IP
   - 添加以下DNS记录:
     - A记录: @ -> 您的服务器IP
     - CNAME记录: www -> aistone.org

## 使用Vercel一键部署

最简单的部署方式是使用Vercel平台:

1. 在GitHub上创建仓库并推送代码
2. 在[Vercel](https://vercel.com)上注册并连接您的GitHub账户
3. 导入您的游戏导航网站仓库
4. 配置自定义域名aistone.org
   - 在Vercel项目设置中添加自定义域名
   - 按照Vercel提供的DNS设置说明更新您的DNS记录

## 管理员功能

网站管理员功能可通过访问`/admin`路径进入:
- 游戏管理: 添加、编辑、删除游戏
- 分类管理: 创建和管理游戏分类

## 许可证

本项目采用MIT许可证。

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

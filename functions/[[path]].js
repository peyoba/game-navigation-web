// Cloudflare Pages 函数处理所有路径
export async function onRequest(context) {
  // 将请求传递给应用程序
  try {
    // 尝试返回请求的资源
    return await context.env.ASSETS.fetch(context.request);
  } catch (err) {
    // 如果资源不存在，返回 index.html
    return context.env.ASSETS.fetch(`${new URL(context.request.url).origin}/index.html`);
  }
} 
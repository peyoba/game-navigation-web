export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // 重定向根路径到 index.html
    if (url.pathname === '/') {
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }
    // 尝试获取资源
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // 如果资源不存在，尝试作为 SPA 路由处理
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }
  }
} 
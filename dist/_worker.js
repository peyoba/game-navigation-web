export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 尝试直接获取请求的资源
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // 如果获取失败，返回index.html（SPA路由处理）
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }
  }
} 
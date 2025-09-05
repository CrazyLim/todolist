// 在Create React App v5中，setupProxy.js的配置方式需要使用以下格式
// 注意：这个文件会自动被Create React App的开发服务器加载

module.exports = function(app) {
  // 仅在开发环境中应用代理
  if (process.env.NODE_ENV === 'development') {
    const { createProxyMiddleware } = require('http-proxy-middleware');
    
    // API请求代理 - 所有以/api开头的请求都会被代理到指定服务器
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 可选：去掉URL中的/api前缀
        },
        // 避免对热重载和静态资源请求进行代理
        bypass: function(req, res, proxyOptions) {
          // 不对静态资源文件进行代理
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return '/index.html';
          }
          // 不对热重载请求进行代理
          if (req.url.includes('.hot-update.')) {
            return req.url;
          }
        }
      })
    );
    
    // 图片请求代理 - 所有以/images开头的请求会被代理
    app.use(
      '/images',
      createProxyMiddleware({
        target: 'https://your-image-server.com',
        changeOrigin: true,
        secure: false // 允许自签名证书
      })
    );
  }
};
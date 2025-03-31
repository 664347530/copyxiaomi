module.exports = {  // 导出一个对象
  transpileDependencies: [],  // 这里需要是一个数组，可以为空数组，表示没有特殊依赖需要转译
  devServer: {  // 开发服务器的配置
    proxy: {  // 配置代理
      '/api': {  // 匹配到 /api 前缀的请求
        target: 'http://127.0.0.1:3000',  // 被代理的目标地址
        changeOrigin: true,  // 控制请求头中的 Host 值，将其设置为被代理的目标地址
        pathRewrite: {  // 重写请求路径
          '^/api': '/api'  // 将请求的路径前缀 /api 保持不变
        }
      }
    }
  }
}
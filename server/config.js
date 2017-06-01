module.exports = {
  // 服务端端口，需要与disqus-proxy前端设置一致
  port: 5509,

  // 你的diqus secret key
  api_secret: 'your secret key',

  // 你的网站地址，用于CROS
  site: 'yoursite.com',

  // 服务端socks5代理转发，便于在本地测试，生产环境通常为null
  // socks5Proxy: {
  //   host: 'localhost',
  //   port: 1086
  // },
  socks5Proxy: null
}

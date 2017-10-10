config = {
  // 服务端端口，需要与disqus-proxy前端设置一致
  port: 5509,

  // 你的diqus secret key
  api_secret: 'your secret key',

  // 你的website的 shortname 名称 比如在你的disqus安装代码中 有这样一句脚本：
  // s.src = 'https://test-eo9kkdlcze.disqus.com/embed.js';
  // 那么你的disqus 的shortname 就是 test-eo9kkdlcze
  shortname: 'ciqu',

  // 服务端socks5代理转发，便于在本地测试，生产环境通常为null
  // socks5Proxy: {
  //   host: 'localhost',
  //   port: 1086
  // },

  socks5Proxy: null,

  // 日志输出位置,输出到文件或控制台 'file' | 'console'
  log: 'console'
}

module.exports = (() => {

  if (process.env.DISQUS_PORT != undefined) {
    config.port = process.env.DISQUS_PORT;
  }

  if (process.env.DISQUS_API_SECRECT != undefined) {
    config.api_secret = process.env.DISQUS_API_SECRECT;
  }

  if (process.env.DISQUS_SHORT_NAME != undefined) {
    config.shortname = process.env.DISQUS_SHORT_NAME;
  }

  if (process.env.DISQUS_LOG != undefined) {
    config.log = process.env.DISQUS_LOG;
  }

  return config
})()





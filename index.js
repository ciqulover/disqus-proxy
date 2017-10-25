'use strict'
const fs = require('hexo-fs')

hexo.extend.filter.register('after_render:html', function (str) {

  const idReg = /<div +id *= *["']disqus_thread["'] *>/
  const srcReg = /s.src *= *['"]https:\/\/.+\.disqus\.com\/embed\.js['"];?/
  const insertReg = /\(d\.head *\|\| *d\.body\)\.appendChild\(s\);?/

  if (idReg.test(str)) {

    //CND和外部资源
    const cdn = `
      <script src="//cdn.bootcss.com/react/16.0.0/umd/react.production.min.js"></script>
      <script src="//cdn.bootcss.com/react-dom/16.0.0/umd/react-dom.production.min.js"></script>
      <script src="//cdn.bootcss.com/babel-polyfill/7.0.0-beta.2/polyfill.min.js"></script>
      <script src="//cdn.bootcss.com/moment.js/2.18.1/moment.min.js"></script>
      <script src="//cdn.bootcss.com/fetch/2.0.3/fetch.min.js"></script>
      <script src="//cdn.jsdelivr.net/npm/blockies-identicon@0.1.0/blockies.min.js"></script>
      <link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <link rel="stylesheet" href="/styles/hexo-disqus-proxy.css"/>
      `
    // hexo-disqus-proxy-primary主脚本
    const script = `<script src="/scripts/hexo-disqus-proxy-primary.js" async></script>`

    // 将disqus_thread转化为disqus_proxy_thread
    str = str.replace(idReg, cdn + '<div id="disqus_proxy_thread">' + script)

    // 删除原有的disqus评论脚本
    str = str.replace(srcReg, '')
    str = str.replace(insertReg, '')
  }

  return str
})

hexo.extend.generator.register('assets', function (locals) {
  const config = hexo.config.disqus_proxy
  const asset = [
    {
      path: 'scripts/hexo-disqus-proxy-primary.js',
      data: function () {
        return fs.createReadStream('node_modules/hexo-disqus-proxy/lib/hexo-disqus-proxy-primary.js')
      }
    },
    {
      path: 'styles/hexo-disqus-proxy.css',
      data: function () {
        return fs.createReadStream('node_modules/hexo-disqus-proxy/lib/styles/hexo-disqus-proxy.css')
      }
    }
  ]
  if (!config.admin_avatar) asset.push({
    path: 'avatars/admin-avatar.jpg',
    data: function () {
      return fs.createReadStream('node_modules/hexo-disqus-proxy/lib/avatars/admin-avatar.jpg')
    }
  })
  if (!config.default_avatar) asset.push({
    path: 'avatars/default-avatar.png',
    data: function () {
      return fs.createReadStream('node_modules/hexo-disqus-proxy/lib/avatars/default-avatar.png')
    }
  })
  return asset
})

hexo.extend.filter.register('template_locals', function (locals) {

  if (!locals.page) return locals

  const config = hexo.config.disqus_proxy

  const script = `
      <script>
        window.disqusProxy={
          shortname: '${config.shortname}',
          server: '${config.host}',
          port: ${config.port},
          adminAvatar: '${config.admin_avatar ? config.admin_avatar : "/avatars/admin-avatar.jpg"}',
          identifier: '${locals.page.path}',
        };
        window.disqus_config = function () {
          this.page.url = window.location.href;
          this.page.identifier = window.disqusProxy.identifier;
        };
      </script>`
  locals.page.content = locals.page.content + script

  return locals
})

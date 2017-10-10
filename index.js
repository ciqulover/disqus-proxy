'use strict'
const fs = require('hexo-fs')

hexo.extend.filter.register('after_render:html', function (str) {
  const cdn = `
  <script src="//cdn.bootcss.com/react/16.0.0/umd/react.production.min.js"}></script>
  <script src="//cdn.bootcss.com/react-dom/16.0.0/umd/react-dom.production.min.js"}></script>
  `
  str = str.replace(/<body>/, '<body>' + cdn)
  str = str.replace(/ +id *= *["']disqus_thread["']/, ' id="disqus_proxy_thread"')
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
      path: 'scripts/disqus-proxy.chunk.0.js',
      data: function () {
        return fs.createReadStream('node_modules/hexo-disqus-proxy/lib/disqus-proxy.chunk.0.js')
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
  const layout = locals.page.layout
  if (
    !locals.archive
    && locals.page.source
    && layout !== 'index'
    && layout !== 'tag'
    && layout !== 'categroy'
    && layout !== 'tag'
    && layout !== 'archive'
  ) {
    const config = hexo.config.disqus_proxy

    const script = `
      <script src="/scripts/hexo-disqus-proxy-primary.js" async></script>
      <script>
        window.disqusProxy={
          shortname: '${config.shortname}',
          server: '${config.host}',
          port: ${config.port},
          defaultAvatar: '${config.default_avatar ? config.default_avatar : "/avatars/default-avatar.png"}',
          adminAvatar: '${config.admin_avatar ? config.admin_avatar : "/avatars/admin-avatar.jpg"}',
          identifier: '${locals.page.path}',
        };
        window.disqus_config = function () {
          this.page.url = window.location.href;
          this.page.identifier = window.disqusProxy.identifier;
        };
      </script>`

    locals.page.content = locals.page.content + script
  }
  return locals
})

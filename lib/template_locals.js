module.exports = function (hexo) {
  return function (locals) {

    if (!locals.page) return locals

    const config = hexo.config.disqus_proxy

    const script = `
      <script>
        window.disqusProxy={
          shortname: '${config.shortname}',
          username: '${config.username}',
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
  }
}
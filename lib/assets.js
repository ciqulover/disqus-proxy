const fs = require('hexo-fs')
const path = require('path')

module.exports = function () {
  return [
    {
      path: 'scripts/hexo-disqus-proxy-primary.js',
      data: function () {
        return fs.createReadStream(path.resolve(__dirname, '../../disqus-proxy-core/lib/disqus-proxy-core.js'))
      }
    }
  ]
}

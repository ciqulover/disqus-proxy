module.exports = function (str) {

  const idReg = /<div +id *= *["']disqus_thread["'] *>/
  const srcReg = /s.src *= *['"]https:\/\/.+\.disqus\.com\/embed\.js['"];?/
  const insertReg = /\(d\.head *\|\| *d\.body\)\.appendChild\(s\);?/

  if (idReg.test(str)) {

    //CND和外部资源
    const cdn = `
      <script src="//cdn.bootcss.com/react/16.0.0/umd/react.production.min.js"></script>
      <script src="//cdn.bootcss.com/react-dom/16.0.0/umd/react-dom.production.min.js"></script>
      <script src="//cdn.bootcss.com/fetch/2.0.3/fetch.min.js"></script>
      <script src="//cdn.jsdelivr.net/npm/blockies-identicon@0.1.0/blockies.min.js"></script>
      <link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
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
}

## disqus-proxy

## 用于disqus的反向代理

### 前端配置
进入hexo的主题目录，找到layout文件夹
hexo主题一般用的渲染引擎有`pug`(原`jade`)，`ejs`和`swig`等。

以`pug`为例，通常来说，评论会单独写成一个文件，比如`comment.pug`

在这个`comment.pug`中，`hexo`在生成(`hexo g`)时，会对每一篇生成的文章调用这个文件进行渲染。
在渲染的过程中，`hexo`会提供`theme`,`page`这两个全局变量，可以通过`#{theme}`和`#{page}`调用:

``` js
if theme.disqus_shortname
  #disqus_thread
  #disqus_proxy_thread
  script.
    window.disqusProxy = {
      userName: '#{theme.disqus_shortname}',
      server: 'disqus-proxy.ycwalker.com',
      port: 5509,
      defaultAvatar: '/avatars/default-avatar.png',
      adminAvatar: '/avatars/admin-avatar.jpg',
      identifier: "#{page.path}"
    };
    window.disqus_config = function () {
      this.page.url = "#{page.permalink}"
      this.page.identifier = "#{page.path}"
    };
    window.onload = function () {
      const s = document.createElement('script');
      s.src = '/static/js/main.56688539.js';
      s.async = true;
      document.body.appendChild(s);
    };
  link(rel="stylesheet" href="/static/css/main.0603c539.css")

```

所以，如果在主题的配置文件`config.yml`中有`disqus_shortname`，那么这个文件将会渲染出这样的结果

```
<div id="disqus_thread"></div>
<div id="disqus_proxy_thread"></div>
<script>
window.disqusProxy = {
	userName: 'ciqu',
	server: 'disqus-proxy.ycwalker.com',
	port: 5509,
	defaultAvatar: '/avatars/default-avatar.png',
	adminAvatar: '/avatars/admin-avatar.jpg',
	identifier: "2017/05/25/have-a-nice-weekend/"
};
window.disqus_config = function() {
	this.page.url = "http://ycwalker.com/2017/05/25/have-a-nice-weekend/"
	this.page.identifier = "2017/05/25/have-a-nice-weekend/"
}
;
window.onload = function() {
	const s = document.createElement('script');
	s.src = '/static/js/main.56688539.js';
	s.async = true;
	document.body.appendChild(s);
}
</script>
<link rel="stylesheet" href="/static/css/main.0603c539.css">
```

其中`window.disqusProxy`对象是自制的评论框参数，`userName`是disqus账户名，`server`是你VPS的域名，`port`是VPS服务器启用代理的端口，需要和后端的端口一致，`defaultAvatar`和`adminAvatar`分别是默认头像和管理员头像，`identifier`是告诉disqus该文章对应评论的标识符，一般以文章的路径做标识符。
`window.disqus_config`是disqus成功加载后，disqus用到的参数，分别是文章的地址和标识符。

复制`disqus-proxy/build`目录下的`static`文件夹和`avatars`文件夹到主题目录的source文件夹下。

将`static/js/`下的以main开头js文件名替换上面代码中的`s.src = '/static/js/main.56688539.js';`文件名。

将`static/css/`目录下的css文件名替换`link(rel="stylesheet" href="/static/css/main.0603c539.css")`中的文件名。

至此，前端部分配置完成。


### 后端配置

后端用了`Node.js`，由于采用了`Koa`框架和`async/await`语法，所以需要node.js版本7.6以上，(端午节后Node版本到8了)。

在服务器上clone代码
```
git clone https://github.com/ciqulover/disqus-proxy
```
安装依赖 
只需要启动后端的依赖
```
npm i --production
// 或者
yarn install --production
```

修改`server`目录下的`config.js`
```
module.exports = {
  // 服务端端口，需要与disqus-proxy前端设置一致
  port: 5509,

  // 你的diqus secret key
  api_secret: 'your secret key',

  // 你的网站地址，用于CROS
  site: 'yoursite.com',

  // 你的disqus名称
  username:'ciqu',

  // 服务端socks5代理转发，便于在本地测试，生产环境通常为null
  socks5Proxy: null,
  // 日志输出位置,输出到文件或控制台 'file' | 'console'
  log: 'console'
}

```

其中`api-secret`是在disqus官网申请API后得到的秘钥。

启动
```
node index.js
```

推荐用`pm2`在生产环境启动

```
npm i pm2 -g
pm2 start index.js
```
Done.

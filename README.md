## Disqus-Proxy

## 用于disqus的反向代理

### 准备
* 一台国外的VPS服务器

### 前端配置

#### 在 Hexo 主题 Aqua 中使用 diqus-proxy

Hexo 主题 [aqua](https://github.com/ciqulover/hexo-theme-aqua) 已经集成了 disqus-proxy，可以直接在主题的config.yml里配置。

```yml
# 如果disqus账号名没设置 那么disqus_proxy也不会生效
disqus_username: ciqu

disqus_proxy:
  # 下面两项你需要更改为自己服务器的域名和端口
  server: disqus-proxy.ycwalker.com
  port: 443   #端口号需要与后端设置一致
  # 头像路径设置
  default_avatar: /avatars/default-avatar.png
  admin_avatar: /avatars/admin-avatar.jpg
  # 脚本和css路径通常不需要更改
  script_path: /static/js/main.0d0338ae.js
  css_path: /static/css/main.0603c539.css
```
所以在这里，通常只需要配置三项就可以了，分别是

* disqus 的用户名称
* 你用于代理disqus的VPS服务器地址
* 你用于代理disqus的端口

对于 [aqua](https://github.com/ciqulover/hexo-theme-aqua) ，这些就是disqus-proxy全部前端配置。

#### 在其他 Hexo 主题中使用 diqus-proxy

如果你用其他主题，那么前端配置会麻烦一些。

Hexo主题一般用的渲染引擎有`pug`(原`jade`)，`ejs`和`swig`等。

接下来以`pug`为例，说明前端配置

进入hexo的主题目录，找到`layout`文件夹。

通常来说，评论会单独写成一个文件，比如`comment.pug`

在这个`comment.pug`中，`hexo`在生成(`hexo g`)时，会对每一篇生成的文章调用这个文件进行渲染。

在渲染的过程中，`hexo`会提供`page`这个全局变量，在pug文件中，你可以在生成的script中以`#{page}`调用。

将`comment.pug`全部替换成如下内容：

``` js
div#disqus_thread
div#disqus_proxy_thread
script.
  window.disqusProxy = {
  username: 'ciqu',
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

这个文件将会渲染出这样的结果

``` html
<div id="disqus_thread"></div>
<div id="disqus_proxy_thread"></div>
<script>
window.disqusProxy = {
	username: 'ciqu',
	server: 'disqus-proxy.ycwalker.com',
	port: 5509,
	defaultAvatar: '/avatars/default-avatar.png',
	adminAvatar: '/avatars/admin-avatar.jpg',
	identifier: "2017/05/25/have-a-nice-weekend/"
};
window.disqus_config = function() {
	this.page.url = "http://ycwalker.com/2017/05/25/have-a-nice-weekend/"
	this.page.identifier = "2017/06/01/diqus-proxy-config/"
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

其中`window.disqusProxy`对象是自制的评论框参数，参数说明如下：


* `userName`是disqus账户名
  * `server`是你启用disqus代理的VPS的域名
  * `port`是VPS服务器启用disqus代理的端口，需要和后端设置的端口一致
  * `defaultAvatar`和`adminAvatar`分别是默认头像和管理员头像
  * `identifier`是告诉disqus该文章对应评论的标识符，一般以文章的路径做标识符。


其中`window.disqus_config`是disqus成功加载后，disqus用到的参数，分别是文章的地址和标识符。


**划重点：** 

下载或者克隆项目代码 [disqus-proxy](https://github.com/ciqulover/disqus-proxy)

复制disqus-porxy中已经build完毕的`disqus-proxy/build`目录下的`static`文件夹和`avatars`文件夹到主题目录的source文件夹下。

将`static/js/`下的以main开头js文件名替换上面代码中的`s.src = '/static/js/main.56688539.js';`文件名。

将`static/css/`目录下的css文件名替换`link(rel="stylesheet" href="/static/css/main.0603c539.css")`中的文件名。

PS：你会发现`static/js/`目录下有两个js文件，其中main开头的脚本用于检测网络状况以选择性加载disqus，另一个js文件为自制的评论框，在disqus不能加载时会被之前的js文件动态请求加载，所以不用管它，你只要确认它的路径在`/static/js/`下就可以了。

至此，前端部分配置完成。

### 后端配置

后端用了`Node.js`，由于采用了`Koa`框架和`async/await`语法，所以需要`Node.js`版本`7.6`以上，话说端午节后`Node.js`最新版本都到8了耶。

#### 在服务器上clone代码:
```
git clone https://github.com/ciqulover/disqus-proxy
```
#### 安装依赖 
只需要安装后端的依赖
```
npm i --production
// 或者
yarn install --production
```

#### 配置`server`目录下的`config.js`
``` js
module.exports = {
  // 服务端端口，需要与disqus-proxy前端设置一致
  port: 5509,

  // 你的diqus secret key
  api_secret: 'your secret key',

  // 你的disqus名称
  username:'ciqu',

  // 服务端socks5代理转发，便于在本地测试，生产环境通常为null
  socks5Proxy: null,
  // 日志输出位置,输出到文件或控制台 'file' | 'console'
  log: 'console'
}

```
#### 获取`api-secret`
`api-secret`需要你在[disqus](https://disqus.com/)的官方网站上开启API权限，申请成功后会得到这个秘钥。

并且需要在后台的Settings => Community里开启访客评论

#### 启动

```
cd server
node index.js
```

推荐用`pm2`在生产环境启动，否则你断开ssh，node进程就终止了

```
npm i pm2 -g
pm2 start index.js
```
如果你在配置文件中选择`log`类型为`file`, 那么输出的日志文件将在默认为server目录下的`disqus-proxy.log`

#### Done !

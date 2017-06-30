## Disqus-Proxy

## 用于disqus的反向代理

### [Demo](https://ycwalker.com/test-disqus-proxy/)

### 准备
* 一台国外的VPS服务器

### 前端配置

#### 在 Hexo 主题 Aqua 中使用 diqus-proxy

Hexo 主题 [aqua](https://github.com/ciqulover/hexo-theme-aqua) 已经集成了 disqus-proxy，可以直接在主题的config.yml里配置。

```yml
# 如果disqus账号名没设置 那么disqus_proxy也不会生效
# 这里的disqus_username 即 {yourname}.disqus.com 中的`yourname`
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

如何看hexo的渲染主题是哪一个？ 进入主题目录下的layout目录，看文件的格式就知道了。

下面我会一一说明配置方法。

##### 模板引擎pug(jade)

进入hexo的主题目录，找到`layout`文件夹。

通常来说，评论会单独写成一个文件，比如`comment.pug`,在`layout`文件夹下面或者其子目录下面。

在这个`comment.pug`中，`hexo`在生成(`hexo g`)时，会对每一篇生成的文章调用这个文件进行渲染。

在渲染的过程中，`hexo`会提供`page`这个全局变量，在pug文件中，你可以在生成的script中以`#{page}`调用。

将`comment.pug`全部替换成如下内容(注意缩进)：

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
  var s = document.createElement('script');
  s.src = '/static/js/main.56688539.js';
  s.async = true;
  document.body.appendChild(s);
  
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
var s = document.createElement('script');
s.src = '/static/js/main.56688539.js';
s.async = true;
document.body.appendChild(s);
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

##### 模板引擎swig

对于渲染引擎为`swig`的`hexo`主题，可以将类似`comment.swig`直接改成这样
```html
{% if true %}
  <div id="disqus_proxy_thread"></div>
  <div id="disqus_thread">
  <script type="text/javascript">
        window.disqusProxy = {
          username: 'ciqu',
          server: 'disqus-proxy.ycwalker.com',
          port: 5509,
          defaultAvatar: '/avatars/default-avatar.png',
          adminAvatar: '/avatars/admin-avatar.jpg',
          identifier: '{{ page.path }}'
        };
        window.disqus_config = function () {
          this.page.url = '{{ page.permalink }}';
          this.page.identifier = '{{ page.path }}';
        };
        var s = document.createElement('script');
        s.src = '/static/js/main.0d0338ae.js';
        s.async = true;
        document.body.appendChild(s);
    </script>
    <link rel="stylesheet" href="/static/css/main.0603c539.css">
{% endif %}
```

比如著名的`hexo`主题[next](https://github.com/iissnan/hexo-theme-next)就用了`swig`做模板引擎，你只要将其主题下的`next/layout/_partial`目录下的`comments.swig`内容全部替换成上面的代码就OK了。
注意，`window.disqusProxy`和`window.disqus_config`的配置项请参阅前文`pug`部分的说明。

##### 模板引擎ejs

对于渲染引擎为`ejs`的`hexo`主题，可以将类似`comment.ejs`直接改成这样:

```html
  <div id="disqus_proxy_thread"></div>

  <div id="disqus_thread"></div>
  
  <script>
    window.disqusProxy = {
      username: 'ciqu',
      server: 'disqus-proxy.ycwalker.com',
      port: 5509,
      defaultAvatar: '/avatars/default-avatar.png',
      adminAvatar: '/avatars/admin-avatar.jpg',
      identifier: '<%= page.path %>'
    };
    window.disqus_config = function () {
      this.page.url = '<%= page.permalink %>';
      this.page.identifier = '<%= page.path %>';
    };
    var s = document.createElement('script');
    s.src = '/static/js/main.0d0338ae.js';
    s.async = true;
    document.body.appendChild(s);
  </script>

  <link rel="stylesheet" href="/static/css/main.0603c539.css">
```

比如使用`ejs`为模板引擎的[fexo](https://github.com/forsigner/fexo)主题，可以直接将`fexo/layout/_partial/component/`目录下的`comments.ejs`全部改为上述文件就行了。注意，`window.disqusProxy`和`window.disqus_config`的配置项请参阅前文`pug`部分的说明。


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

  // 你在disqus里设置你网站的shortname
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

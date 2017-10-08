## Disqus-Proxy

## 用于disqus的反向代理

### [Demo](https://ycwalker.com/test-disqus-proxy/)

### 准备
* 一台国外的VPS服务器
* 一点点的HTML基本知识

### 安装

```
npm install hexo-disqus-proxy --save
```

### 前端配置

在你的`Hexo`博客目录中修改`_config.yml`文件
添加如下配置：（注意缩进和空格）
```
disqus_proxy:
  shortname: ciqu
  host: disqus-proxy.ycwalker.com
  port: 443
  admin_avatar: /avatars/admin-avatar.jpg
  default_avatar: /avatars/default-avatar.png
```
其中：
* `shortname` 是你的website的 shortname 名称 比如在你的disqus安装代码中 有这样一句脚本：
              s.src = 'https://test-eo9kkdlcze.disqus.com/embed.js';
              那么你的disqus 的shortname 就是 test-eo9kkdlcze
* `host`是你启用disqus代理的VPS的域名
* `port`是VPS服务器启用disqus代理的端口，需要与之后设置的后端一致
* `default_avatar`和`admin_avatar`分别是默认头像和管理员头像的路径。例如在`source`目录下建立`avatars`目录，放入两个头像，在这里设置成绝对路径。如果不设置，则为默认头像。

#### 关键的一步

在`disqus`的官方配置中，我们需要在页面合适位置添加一个 `<div id="disqus_thread"></div>` 作为占位符，
而`hexo-disqus-proxy`插件并不能知道在页面的哪个位置插入这个标签比较合适，所以这个需要额外配置一下：

##### 情况一
如果你本身用的主题已经支持`disqus`的配置，那么灰常爽，你不需要额外操作了，这是最常见的情况，肯定是最吼的。
##### 情况二
在你写的`markdown`文件底部插入`<div id="disqus_thread"></div>`。这样评论框位置不会乱跑。什么，`markdown`也能插入`HTML`标签？
嗯是的。
##### 情况三
稍微懂一点点`hexo`的基本知识，自己改主题。大概的思路是，在`Hexo`渲染的过程中，把`<div id="disqus_thread"></div>`加在合适的位置就行了。
##### 情况四
什么也不做的话，默认会直接把评论框元素挂在`body`的元素的最后。

### 后端配置

后端使用`Node.js`，需要`Node.js`版本`7.6`以上。

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
npm install pm2 -g
pm2 start index.js
```
如果你在配置文件中选择`log`类型为`file`, 那么输出的日志文件将在默认为server目录下的`disqus-proxy.log`

#### Done !

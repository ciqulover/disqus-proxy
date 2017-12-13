## Hexo 插件，解决 disqus 不能访问的反向代理
[![npm package](https://img.shields.io/npm/v/hexo-disqus-proxy.svg?style=flat)](https://www.npmjs.org/package/hexo-disqus-proxy)
![](https://img.shields.io/badge/node-%3E7.6-brightgreen.svg)

[![NPM](https://nodei.co/npm/hexo-disqus-proxy.png)](https://nodei.co/npm/hexo-disqus-proxy/)


### [Demo](https://ycwalker.com/test-disqus-proxy/)

### 准备
* 一台国外的VPS服务器
* 基本的命令行相关知识
* 一点点hexo的使用经验

### 安装

在`Hexo`博客目录执行
```
npm install hexo-disqus-proxy --save
```

### 前端配置

在你的`Hexo`博客目录中修改`_config.yml`文件
添加如下配置：（注意缩进和空格）
```
disqus_proxy:
  shortname: ciqu
  username: ciqu
  host: disqus-proxy.ycwalker.com
  port: 443
```
其中：
* `shortname` 是你的website的 shortname 名称 比如在你的disqus安装代码中 有这样一句脚本：
         s.src = 'https://test-eo9kkdlcze.disqus.com/embed.js';
         那么你的disqus 的shortname 就是 test-eo9kkdlcze
* `username` 是你的disqus用户名，即评论时候留下的名字，用来区别disqus-proxy的评论头像显示
* `host`是你启用disqus代理的VPS的域名
* `port`是VPS服务器启用disqus代理的端口，需要与之后配置的后端一致

#### 关键的一步

在`disqus`的官方配置中，我们需要在页面合适位置添加一个 `<div id="disqus_thread"></div>` 作为占位符，
而`hexo-disqus-proxy`插件并不能知道在页面的哪个位置插入这个标签比较合适，所以这个需要额外配置一下：

##### 情况一
如果你本身用的主题已经支持`disqus`的配置，那么灰常爽，你只需要正常启用主题的disqus评论，插件就会自动检测并合适的覆盖，
这是最常见的情况，肯定是最吼的。
##### 情况二
在你写的`markdown`文件底部插入`<div id="disqus_thread"></div>`。这样评论框位置会位于文章的下方，并且大小能被外部元素所约束，不会乱跑。
什么，`markdown`也能插入`HTML`标签？

嗯是的。
##### 情况三
稍微懂一点点`hexo`的基本知识，自己改主题。大概的思路是，在`Hexo`渲染的过程中，把`<div id="disqus_thread"></div>`加在主题目录下的layout目录中
关于博文页面的模板中的合适的位置就行了。

### 后端配置

**`1.3.0`版本之后将后端分离出来，查看[这里](https://github.com/ciqulover/disqus-proxy-server)进行配置** 

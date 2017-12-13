'use strict'

// diqus原生脚本替换
hexo.extend.filter.register('after_render:html', require('./lib/after_render'))

// 引入资源
hexo.extend.generator.register('assets', require('./lib/assets'))

// 生成配置
hexo.extend.filter.register('template_locals', require('./lib/template_locals')(hexo))

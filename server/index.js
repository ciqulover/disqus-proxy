const Koa = require('koa')
const app = new Koa()
const rq = require('request-promise-native')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const log4js = require('log4js')
const logger = log4js.getLogger('disqus-proxy')
const cors = require('kcors')
const config = require('./config')
// const config = require('./my-config')


if (config.log === 'file') log4js.configure({
  appenders: [{
    type: 'file',
    filename: 'disqus-proxy.log'
  }]
})

app.use(bodyParser())
app.use(cors())

let req = {}
const socks5 = config.socks5Proxy

if (socks5 && typeof socks5.host === 'string' && typeof socks5.port === 'number') {
  req = {
    agentClass: require('socks5-https-client/lib/Agent'),
    agentOptions: {
      socksHost: socks5.host,
      socksPort: socks5.port
    },
  }
}

router.get('/api/getThreads', async function (ctx) {
  logger.info('Get thread with identifier: ' + ctx.request.query.identifier)
  let result

  try {
    result = await rq(Object.assign(req, {
      method: 'GET',
      url: 'https://disqus.com/api/3.0/threads/list.json?' +
      'api_secret=' + config.api_secret +
      '&forum=' + config.username +
      '&thread:ident=' + ctx.request.query.identifier,
      json: true
    }))
  } catch (e) {
    ctx.body = e.error
    logger.error('Error when get thread:' + JSON.stringify(e.error))
    return
  }
  logger.info('Get thread successfully with response code: ' + result.code)
  ctx.body = result
})


router.get('/api/getComments', async function (ctx) {
  logger.info('Get Comments with identifier: ' + ctx.request.query.identifier)
  let result

  try {
    result = await rq(Object.assign(req, {
      method: 'GET',
      url: 'https://disqus.com/api/3.0/threads/listPosts.json?' +
      'api_secret=' + config.api_secret +
      '&forum=' + config.username +
      '&thread:ident=' + ctx.request.query.identifier,
      json: true
    }))
  } catch (e) {
    ctx.body = e.error
    logger.error('Error when get comment:' + JSON.stringify(e.error))
    return
  }
  logger.info('Get comments successfully with response code: ' + result.code)
  ctx.body = result
})

router.post('/api/createComment', async function (ctx) {
  logger.info('Create comment: ' + JSON.stringify(ctx.request.body))
  let result
  try {
    result = await rq(Object.assign(req, {
      url: 'https://disqus.com/api/3.0/posts/create.json',
      method: 'POST',
      form: Object.assign(ctx.request.body, {
        api_key: 'E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F',
      }),
      json: true
    }))
  } catch (e) {
    logger.error('Error when create comment:' + JSON.stringify(e.error))
    ctx.body = e.error
    return
  }
  ctx.body = result
  logger.info('Create comment successfully with response code: ' + result.code)
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port)

console.log('Disqus proxy server start at port: ' + config.port)

if (config.log === 'file') {
  console.log('See disqus-proxy.log in current directory.')
  logger.info('Server start at port: ' + config.port)
}

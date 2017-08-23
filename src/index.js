import React from 'react'
import ReactDOM from 'react-dom'
import DisqusChecker from './DisqusChecker'

ReactDOM.render(<DisqusChecker/>, document.getElementById('disqus_proxy_thread'))

const styleSheet = document.createElement('link')
styleSheet.rel = 'stylesheet'
styleSheet.href = '//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
document.head.appendChild(styleSheet)

const moment = document.createElement('script')
moment.src = '//cdn.bootcss.com/moment.js/2.18.1/moment.min.js'
document.body.appendChild(moment)

const style = document.createElement('style')
style.innerHTML = `
#disqus_proxy_thread {
  padding-top: 30px;
}

#disqus_proxy_thread .comment-body a {
  color: #42b983;
  text-decoration: none;
}

#disqus_proxy_thread .disqus-statement {
  font-size: 12px;
  padding-left: 92px;
  color: rgba(0, 0, 0, 0.6);
}

#disqus_proxy_thread .disqus-statement a {
  text-decoration: none;
  color: #42b983;
}

#disqus_proxy_thread .disqus-proxy {
  width: 100%;
}

#disqus_proxy_thread .disqus-proxy ul, #disqus_proxy_thread .disqus-proxy li {
  list-style: none;
}

#disqus_proxy_thread .disqus-proxy ul {
  line-height: normal;
  margin-left: 56px;
  padding: 0;
}

@media screen and (max-width: 500px) {
  #disqus_proxy_thread .disqus-proxy ul, #disqus_proxy_thread .disqus-proxy ul.post-reply {
    margin-left: 10px;
  }

  #disqus_proxy_thread .disqus-proxy .disqus-statement {
    padding-left: 80px;
  }

  #disqus_proxy_thread .disqus-proxy .comment-box .comment-info .avatar img {
    width: 40px;
    height: 40px;
  }

  #disqus_proxy_thread .disqus-proxy .comment-box .comment-info textarea {
    left: 60px;
    width: calc(100% - 60px);
  }
}
`

document.head.appendChild(style)

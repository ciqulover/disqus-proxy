import React from 'react'
import ReactDOM from 'react-dom'
import DisqusChecker from './DisqusChecker'
import './index.css'

ReactDOM.render(<DisqusChecker />, document.getElementById('disqus_proxy_thread'))

const styleSheet = document.createElement('link')
styleSheet.rel = 'stylesheet'
styleSheet.href = '//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
document.head.appendChild(styleSheet)

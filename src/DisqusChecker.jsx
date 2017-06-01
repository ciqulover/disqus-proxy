import React, {Component} from 'react'

export default class DisqusChecker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disqusOnload: false,
      DisqusProxy: null,
    }
  }

  componentWillMount() {

    const s = document.createElement('script')
    s.src = 'https://ciqu.disqus.com/embed.js'
    s.async = true
    s.setAttribute('data-timestamp', String(+new Date()))
    s.onload = () => {
      this.setState({disqusOnload: true})
    }
    s.onerror = () => {
      this.setState({disqusOnload: false})
    }

    document.body.appendChild(s)

    setTimeout(async () => {
      if (!this.state.disqusOnload) {
        const DisqusProxy = await import('./DisqusProxy')
        this.setState({DisqusProxy: DisqusProxy.default})
        document.getElementById('disqus_thread').style.display = 'none'
      }
    }, 3000)
  }

  render() {
    return (
      this.state.DisqusProxy
        ? (<this.state.DisqusProxy />)
        : !this.state.disqusOnload && (
          <div className="disqus-statement">
            <span>正在尝试加载
              <a href="https://disqus.com"
                 rel="noopener noreferrer"
                 target="_blank"> disqus </a>
              评论系统
            </span>
            <i className="fa fa-spinner fa-spin fa-fw"/>
          </div>
        )
    )
  }
}

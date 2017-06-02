import React, {Component} from 'react'

export default class DisqusChecker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disqusLoaded: false,
      DisqusProxy: null,
    }
  }

  componentWillMount() {

    const s = document.createElement('script')
    const username = window.disqusProxy.username
    s.src = `https://${username}.disqus.com/embed.js`
    s.async = true
    s.setAttribute('data-timestamp', String(+new Date()))
    s.onload = () => {
      this.setState({disqusLoaded: true})
    }
    s.onerror = () => {
      this.setState({disqusLoaded: false})
      console.log('Failed to load disqus. Load disqus-proxy instead.')
    }

    document.body.appendChild(s)

    setTimeout(async () => {
      if (!this.state.disqusLoaded) {
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
        : !this.state.disqusLoaded && (
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

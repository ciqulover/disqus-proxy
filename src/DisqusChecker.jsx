import React, {Component} from 'react'
import DisqusProxy from './DisqusProxy'

export default class DisqusChecker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disqusLoaded: false,
      isLoading: true,
    }
  }

  async componentWillMount() {

    try {
      const thread = fetch(`https://disqus.com/next/config.json?timestamp=${Date.now()}`)

      const limit = new Promise(resolve => setTimeout(() => resolve({status: 600}), 2000))

      const res = await Promise.race([thread, limit])

      // 2秒内如果没加载出来config.json 则认为disqus无法访问
      if (res.status !== 200) {
        console.warn('pre-test loading failed, load disqus-proxy instead')
        this.setState({isLoading: false})
      }

      const s = document.createElement('script')
      const shortname = window.disqusProxy.shortname
      s.src = `https://${shortname}.disqus.com/embed.js`
      s.async = true
      s.setAttribute('data-timestamp', String(+new Date()))
      s.onload = () => {
        if (!this.state.isLoading) return
        this.setState({isLoading: false, disqusLoaded: true})
      }
      s.onerror = () => {
        document.getElementById('disqus_thread').style.display = 'none'
        this.setState({isLoading: false})
        console.warn('Failed to load disqus. Load disqus-proxy instead.')
      }
      // 3秒内没加载embed.js 则认为还是无法访问disqus
      setTimeout(() => {
        if (!this.state.disqusLoaded) {
          this.setState({isLoading: false})
          document.getElementById('disqus_thread').style.display = 'none'
        }
      }, 3000)

      document.body.appendChild(s)
    } catch (e) {
      console.warn(e)
      this.setState({isLoading: false})
      document.getElementById('disqus_thread').style.display = 'none'
    }
  }

  render() {
    const {disqusLoaded, isLoading} = this.state
    return (
      isLoading ? (
        <div className="disqus-statement">
            <span>正在尝试加载
              <a href="https://disqus.com"
                 rel="noopener noreferrer"
                 target="_blank"> disqus </a>
              评论系统
            </span>
          <i className="fa fa-spinner fa-spin fa-fw"/>
        </div>
      ) : !disqusLoaded && <DisqusProxy/>
    )
  }
}

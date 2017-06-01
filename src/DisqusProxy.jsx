import React, {Component} from 'react'
import CommentBox from './components/CommentBox'
import CommentList from './components/CommentList'
import Notification from './components/Notification'

export default class DisqusProxy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      notificationTitle: '',
      notificationBody: '',
      showNotification: false,
    }
  }

  async componentWillMount() {

    const identifier = window.disqusProxy.identifier
    const query = 'identifier=' + encodeURIComponent(identifier)
    const url = '//' + window.disqusProxy.server + ':'
      + window.disqusProxy.port.toString() + '/api/getComments'
    const result = await fetch(url + '?' + query)
    const res = await result.json()

    if (res.code === 0) this.setState({comments: res.response})
    else if (typeof res.code === 'number') {
      this.setState({
        notificationTitle: '评论获取错误',
        notificationBody: res.response,
        showNotification: true
      })
    }
  }

  render() {
    return (
      <div className="disqus-proxy">
        <div className="disqus-statement">
          您的网络连接在连接
          <a href="https://disqus.com"> disqus.com </a>
          时出现问题, 已为你展示精简版评论系统
        </div>
        <CommentBox/>
        {this.state.showNotification && (
          <Notification title={this.state.notificationTitle}
                        body={this.state.notificationBody}
                        duration={50000}/>
        )}
        <CommentList comments={this.state.comments}/>
      </div>
    )
  }
}

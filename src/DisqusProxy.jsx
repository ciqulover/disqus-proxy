import React, {Component} from 'react'
import CommentBox from './components/CommentBox'
import CommentList from './components/CommentList'
import Notification from './components/Notification'

export default class DisqusProxy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      isFetchingComment: true,
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
    try {
      const result = await fetch(url + '?' + query)
      const res = await result.json()
      this.setState({isFetchingComment: false})
      if (res.code === 0) this.setState({comments: res.response})
      else {
        this.setState({
          notificationTitle: '评论获取错误',
          notificationBody: res.response,
          showNotification: true
        })
      }
    } catch (e) {
      this.setState({
        isFetchingComment: false,
        notificationTitle: '评论获取错误',
        notificationBody: e,
        showNotification: true
      })
    }
  }

  render() {
    const {notificationTitle, notificationBody, showNotification, comments, isFetchingComment} = this.state
    return (
      <div className="disqus-proxy">
        <div className="disqus-statement">
          您的网络连接在连接
          <a href="https://disqus.com"> disqus.com </a>
          时出现问题, 已为你展示精简版评论系统
        </div>
        <CommentBox/>
        {showNotification && (
          <Notification title={notificationTitle}
                        body={notificationBody}
                        duration={50000}/>
        )}
        <CommentList comments={comments} isLoading={isFetchingComment}/>
      </div>
    )
  }
}

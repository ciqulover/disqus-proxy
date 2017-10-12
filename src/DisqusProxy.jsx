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

    // 用文字标识符获取评论
    const identifier = window.disqusProxy.identifier
    const query = 'identifier=' + encodeURIComponent(identifier)
    const url = '//' + window.disqusProxy.server + ':'
      + window.disqusProxy.port.toString() + '/api/getComments'
    try {
      const result = await fetch(url + '?' + query)
      const res = await result.json()
      this.setState({isFetchingComment: false})
      if (res.code === 0) this.setState({comments: res.response})
      // 错误码 2 是找不到文章的thread，一般为未有评论，故此处忽略之
      else if (res.code !== 2) this.setState({
        notificationTitle: '评论获取错误',
        notificationBody: res.response,
        showNotification: true
      })
    } catch (e) {
      this.setState({
        isFetchingComment: false,
        notificationTitle: '评论获取错误',
        notificationBody: e.message,
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

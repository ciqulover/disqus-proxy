import React, {Component} from 'react'
import Notification from './Notification'
import './CommentBox.css'
import classNames from 'classnames'

export default class commentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      thread: null,
      message: '',
      authorName: '',
      authorEmail: '',
      authorNameValid: true,
      authorEmailValid: true,
      messageValid: true,
      showCommentMeta: false,
      disabled: false,
      notificationTitle: '',
      notificationBody: '',
      showNotification: false,
    }
  }

  async componentWillMount() {

    const identifier = window.disqusProxy.identifier
    const query = 'identifier=' + encodeURIComponent(identifier)
    const url = '//' + window.disqusProxy.server + ':'
      + window.disqusProxy.port.toString() + '/api/getThreads'
    const result = await fetch(url + '?' + query)
    const res = await result.json()

    if (res.code === 0 && res.response.length) {
      const thread = res.response[0].id
      this.setState({thread})
      const message = localStorage.getItem(thread)
      if (typeof message === 'string') this.setState({message})

    } else if (typeof res.code === 'number') {
      this.setState({
        notificationTitle: 'thread 获取错误',
        notificationBody: res.response,
        showNotification: true
      })
    }
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
      [key + 'Valid']: true
    })
  }

  async postComment() {
    if (!this.state.thread) return

    this.setState({
      message: this.state.message.trim(),
      authorName: this.state.authorName.trim(),
      authorEmail: this.state.authorEmail.trim(),
    })

    const checkValid = () => {
      let valid = true
      ;['message', 'authorName', 'authorEmail'].forEach(item => {
        if (this.state[item] === '') {
          valid = false
          this.setState({[item + 'Valid']: false})
        }
      })

      const email = this.state.authorEmail
      if (!/^[-a-zA-Z0-9.]+@[-a-zA-Z0-9]+\.[-a-zA-Z0-9]+$/.test(email)) {
        valid = false
        this.setState({authorEmailValid: false})
      }
      return valid
    }

    const isValid = checkValid()

    if (!isValid) return false

    this.setState({disabled: true})

    localStorage.setItem(this.state.thread.toString(), this.state.message)

    const payload = {
      thread: this.state.thread,
      author_name: this.state.authorName,
      author_email: this.state.authorEmail,
      message: this.state.message
    }
    const url = '//' + window.disqusProxy.server + ':'
      + window.disqusProxy.port.toString() + '/api/createComment'

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }

  commentMetaToggle = () => {
    this.setState({showCommentMeta: !this.state.showCommentMeta})
  }

  async submit() {
    if (this.state.disabled) return
    const response = await this.postComment()
    if (!response) return
    const res = await response.json()
    this.setState({disabled: false})

    if (res.code === 0) {
      localStorage.removeItem(this.state.thread)
      this.setState({
        message: '',
        authorName: '',
        authorEmail: '',
        showCommentMeta: false,
        notificationTitle: '发表成功',
        notificationBody: '请等待审核',
        showNotification: true,
      })
      setTimeout(() => {
        this.setState({showNotification: false})
      }, 5000)
    } else if (typeof res.code === 'number') {
      this.setState({
        notificationTitle: '发表失败',
        notificationBody: res.response,
        showNotification: true,
      })
      setTimeout(() => {
        this.setState({showNotification: false})
      }, 5000)
    }
  }

  render() {

    const metaClasses = classNames({
      'comment-meta': true,
      'show-comment-meta': this.state.showCommentMeta
    })

    const messageClasses = classNames({'error': !this.state.messageValid})
    const authorNameClasses = classNames({'error': !this.state.authorNameValid})
    const authorEmailClasses = classNames({'error': !this.state.authorEmailValid})

    return (
      <div className="comment-box">
        <div className="comment-info">
          <div className="avatar">
            <img src={window.disqusProxy.defaultAvatar} alt="avatar"/>
          </div>
          <textarea value={this.state.message}
                    className={messageClasses}
                    disabled={this.state.disabled}
                    onChange={e => this.handleChange(e, 'message')}/>
        </div>
        {this.state.showNotification && (
          <Notification title={this.state.notificationTitle}
                        body={this.state.notificationBody}
                        duration={4000}/>
        )}
        <div className="comment-button" onClick={this.commentMetaToggle}>
          <i className="fa fa-comment-o" aria-hidden="true"/>
        </div>
        <div className={metaClasses}>
          <label >
            <span><i className="fa fa-user-o" aria-hidden="true"/> 昵称 </span>
            <input type="text"
                   className={authorNameClasses}
                   value={this.state.authorName}
                   disabled={this.state.disabled}
                   onChange={e => this.handleChange(e, 'authorName')}/>
          </label>
          <label>
            <span><i className="fa fa-envelope-o" aria-hidden="true"/> 邮箱 </span>
            <input type="text"
                   className={authorEmailClasses}
                   value={this.state.authorEmail}
                   disabled={this.state.disabled}
                   onChange={e => this.handleChange(e, 'authorEmail')}/>
          </label>
          <button onClick={() => this.submit()}>
            <i className="fa fa-share" aria-hidden="true"/>
          </button>
        </div>
      </div>
    )
  }
}

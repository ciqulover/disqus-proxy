import React, {Component}from 'react'
import './Notification.css'
import classNames from 'classnames'

export default class Notification extends Component {

  constructor(props) {
    super(props)
    this.state = {show: false}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({show: true})
    }, 0)
    setTimeout(() => {
      this.setState({show: false})
    }, this.props.duration)
  }

  render() {
    const notificationClasses = classNames({
      show: this.state.show,
      notification: true
    })
    return (
      <div className={notificationClasses}>
        <div className="notification-title">
          {this.props.title}
        </div>
        <div className="notification-body">
          {this.props.body}
        </div>
      </div>
    )
  }
}

import React, {Component} from 'react'

const styles = {
  notification: {
    boxSizing: 'border-box',
    transition: 'all 0.5s',
    position: 'absolute',
    padding: 16,
    borderRadius: 6,
    minWidth: 140,
    top: 22,
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, .2)'
  }
}

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
    return (
      <div style={{
             ...styles.notification,
             right: this.state.show ? 40 : '-100%'
           }}>
        <div style={{
          marginBottom: 6,
          fontSize: 14,
          color: 'rgba(0, 0, 0, .85)'
        }}>
          {this.props.title}
        </div>
        <div style={{
          fontSize: 12,
          color: 'rgba(0, 0, 0, .65)'
        }}>
          {this.props.body}
        </div>
      </div>
    )
  }
}

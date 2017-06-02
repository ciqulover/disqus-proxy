import React, {Component} from 'react'
import Comment from './Comment'

import './CommentList.css'
export default class CommentList extends Component {

  render() {
    const comments = this.props.comments
    const topLevelComments = []
    const childComments = []

    comments.forEach(function (comment) {
      (comment.parent ? childComments : topLevelComments)['push'](comment)
    })

    const commentLists = topLevelComments.map(comment => ({
      comment,
      author: comment.author.name,
      isPrimary: comment.author.username === window.disqusProxy.username,
      children: getChildren(+comment.id)
    }))

    function getChildren(id) {
      if (childComments.length === 0) return null
      const list = []
      for (const comment of childComments) {
        if (comment.parent === id) list.unshift({
          comment,
          author: comment.author.name,
          isPrimary: comment.author.username === window.disqusProxy.username,
          children: getChildren(+comment.id)
        })
      }
      return list.length ? list : null
    }

    return (
      <div className="comment-display">
        <ul>
          {commentLists.map(discuss => {
            return (
              <li key={discuss.comment.id}>
                <Comment comment={discuss.comment}
                         children={discuss.children}
                         isPrimary={discuss.isPrimary}
                         author={discuss.author}/>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

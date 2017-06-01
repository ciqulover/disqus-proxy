import React from 'react'
import moment from 'moment'
import './Comemnt.css'

export default function Comment(props) {
  return (
    <div className="post">
      <div className="avatar">
        <img src={
          props.isPrimary
            ? window.disqusProxy.adminAvatar
            : window.disqusProxy.defaultAvatar
        }
             alt="avatar"/>
      </div>
      <div className="post-body">
        <p className="comment-header">
          <span className="comment-author">
            {props.comment.author.name}
          </span>
          {props.isPrimary && (
            <span className="comment-primary">
              Admin
            </span>
          )}
          {props.replyTo && (
            <span className="comment-reply-to">
              <i className="fa fa-share" aria-hidden="true"/>
              {props.replyTo}
            </span>)}
          <span className="comment-time">
            {moment(props.comment.createdAt)
              .utcOffset(-8)
              .format('YYYY/MM/DD HH : mm')}
          </span>
        </p>
        <p className="comment-body"
           dangerouslySetInnerHTML={{__html: props.comment.message}}>
        </p>
      </div>
      {props.children && props.children.length > 0 && (
        <ul className="post-reply">
          {props.children.map(discuss => {
            return (
              <li key={discuss.comment.id}>
                <Comment comment={discuss.comment}
                         author={discuss.author}
                         isPrimary={discuss.isPrimary}
                         replyTo={props.author}
                         children={discuss.children}/>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

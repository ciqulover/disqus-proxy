import React from 'react'

const styles = {
  span: {
    display: 'inline-block',
    marginRight: 10,
  }
}

const getAvatar = (author) => {

  const image = author.avatar.cache || author.avatar.large.cache

  if (image.indexOf('noavatar') === -1) return image

  const getColor = (key) => {
    const keys = [...key]
    const hash = keys.reduce((pre, cur) => pre + cur.charCodeAt(0), 0)
    return `rgb(${hash % 255}, ${hash % 245}, ${hash % 235})`
  }

  return window.blockies.create({
    seed: author.name,
    color: getColor(author.name + 'color'),
    bgcolor: getColor(author.name + 'bgcolor'),
    spotcolor: getColor(author.name + 'spotcolor')
  }).toDataURL()
}

export default function Comment(props) {
  return (
    <div style={{padding: '0 10px'}}>
      <div style={{display: 'inline-block'}}>
        <img src={getAvatar(props.comment.author)}
             style={{
               width: 40,
               height: 40,
               borderRadius: '50%',
               boxShadow: ' 1px 1px 3px 0.5px #ccc'
             }}
             alt="avatar"/>
      </div>
      <div style={{margin: '-60px 0 0 60px'}}>
        <p className="comment-header">
          <span style={{...styles.span, color: '#888', fontSize: 14}}>
            {props.comment.author.name}
          </span>
          {props.isPrimary && (
            <span style={{
              ...styles.span,
              boxSizing: 'border-box',
              lineHeight: '16px',
              fontSize: 12,
              backgroundColor: '#aaa',
              color: 'white',
              padding: '0 3px',
              borderRadius: 4
            }}>
              Admin
            </span>
          )}
          {props.replyTo && (
            <span style={{...styles.span, color: '#888', fontSize: 14}}>
              <i className="fa fa-share"
                 style={{
                   color: '#42b983',
                   display: 'inline-block',
                   marginRight: 10
                 }}/>
              {props.replyTo}
            </span>)}
          <span style={{
            ...styles.span,
            color: '#bbb',
            fontSize: 12,
            fontFamily: "'calligraffittiregular', sans-serif"
          }}>
            {(new Date(+new Date(props.comment.createdAt) + 1000 * 60 * 60 * 8)).toLocaleString()}
          </span>
        </p>
        <p className="comment-body"
           style={{fontSize: 14, color: '#34495e'}}
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

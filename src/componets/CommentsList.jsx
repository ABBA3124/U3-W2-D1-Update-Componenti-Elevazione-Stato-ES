import React from 'react'


const CommentsList = ({ comments }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  return (
    <ul>
      {comments.map((comment, index) => (
        <li className='list-unstyled mb-3' key={index}>
          <strong>Autore:</strong> {comment.author}<br/>
          <strong>Commento:</strong> {comment.comment}<br/>
          <strong>Valutazione:</strong> {comment.rate}/5<br/>
          <strong>Data:</strong> {formatDate(comment.createdAt)}
          <hr/>
        </li>
      ))}
    </ul>
  )
}

export default CommentsList
import React from "react"

const CommentArea = ({ comments }) => {
  return (
    <div>
        <h5>Recensioni</h5>
      {comments.map((comment, index) => (
        <p key={index}>{comment.text}</p>
      ))}
    </div>
  )
}

export default CommentArea

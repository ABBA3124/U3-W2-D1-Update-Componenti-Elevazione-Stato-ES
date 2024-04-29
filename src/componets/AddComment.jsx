import React, { useState } from 'react'

const AddComment = ({ book, onAddComment }) => {
  const [text, setText] = useState('')

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text && book && book.asin) {
      const commentData = {
        comment: text,
        rate: "3",  
        elementId: book.asin
      }

      const response = await fetch('https://striveschool-api.herokuapp.com/api/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTQ0MDA2MzEsImV4cCI6MTcxNTYxMDIzMX0.rZjkpGaKszaiqZqTQJxeF8pP3knO3GoFbdgDQ6T-itk"
        },
        body: JSON.stringify(commentData)
      })

      if (response.ok) {
        const postedComment = await response.json()
        onAddComment(postedComment)
        setText('') 
      } else {
        console.error("Errore durante l'invio del commento")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrivi una recensione"
        className='p-1'
      />
      <button type="submit" className='btn btn-success ms-1'>Invia</button>
    </form>
  )
}

export default AddComment
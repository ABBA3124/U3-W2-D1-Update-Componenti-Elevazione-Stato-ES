import React, { Component } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComment'

class CommentArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
        this.addComment = this.addComment.bind(this)
    }
    
    componentDidMount() {
        if (this.props.book && this.props.book.asin) {
            console.log("Props del libro cliccato:", this.props.book)
            this.fetchComments()
        }
    }
    
    componentDidUpdate(prevProps) {
        if (!prevProps.book && this.props.book && this.props.book.asin) {
            this.fetchComments()
      }
    }

    addComment = (newComment) => {
        this.setState(prevState => ({
            comments: [...prevState.comments, newComment]
        }))
    }
  
    fetchComments = async () => {
        try {
          const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.book.asin}`, {
            headers: {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTQ0MDA2MzEsImV4cCI6MTcxNTYxMDIzMX0.rZjkpGaKszaiqZqTQJxeF8pP3knO3GoFbdgDQ6T-itk"
            }
          })
          if (response.ok) {
            const comments = await response.json()
            console.log("Informazioni ricevute dalla api tramite id:", comments) 
            this.setState({ comments })
          } else {
            console.error('Impossibile recuperare i commenti')
          }
        } catch (error) {
          console.error('Errore durante il recupero dei commenti:', error)
        }
      }
  
      render() {
        return (
            <div>
              <h3 className='mt-3 mb-2'>Recensioni⬇️</h3>
              <CommentsList comments={this.state.comments} />
              <AddComment book={this.props.book} onAddComment={this.addComment} />
          </div>
        )
      }
  }
  
  export default CommentArea
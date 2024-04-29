import React, { Component } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComment'
import Loading from './Loading'

class CommentArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            isLoading: false
        }
        this.addComment = this.addComment.bind(this)
    }
    
    componentDidMount() {
        if (this.props.book && this.props.book.asin) {
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
        this.setState({ isLoading: true })
        try {
          const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.book.asin}`, {
            headers: {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTQ0MDA2MzEsImV4cCI6MTcxNTYxMDIzMX0.rZjkpGaKszaiqZqTQJxeF8pP3knO3GoFbdgDQ6T-itk"
            }
          })
          if (response.ok) {
            const comments = await response.json()
            this.setState({ comments, isLoading: false })
          } else {
            console.error('Impossibile recuperare i commenti')
            this.setState({ isLoading: false })
          }
        } catch (error) {
          console.error('Errore durante il recupero dei commenti:', error)
          this.setState({ isLoading: false })
        }
      }
  

      deleteComment = async (commentId) => {
        this.setState({ isLoading: true })
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTQ0MDA2MzEsImV4cCI6MTcxNTYxMDIzMX0.rZjkpGaKszaiqZqTQJxeF8pP3knO3GoFbdgDQ6T-itk" 
            }
        })

        if (response.ok) {
            this.setState(prevState => ({
                comments: prevState.comments.filter(comment => comment._id !== commentId),
                isLoading: false
            }))
        } else {
            console.error("Errore durante la cancellazione del commento")
            this.setState({ isLoading: false })
        }
    }



      render() {
        return (
            <div>
              <h3 className='mt-3 mb-2'>Recensioni⬇️</h3>
              {this.state.isLoading ? <Loading /> : (
             <>
              <CommentsList comments={this.state.comments} onDelete={this.deleteComment} />
              <AddComment book={this.props.book} onAddComment={this.addComment} />
              </>
              )}
          </div>
        )
      }
  }
  
  export default CommentArea
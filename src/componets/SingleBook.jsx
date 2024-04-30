import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import '../CSS/AllTheBooks.css'
// import CommentArea from './CommentArea'

function SingleBook({ book, onBookSelect }) {
    return (
        <Card className="mb-4 card-container" onClick={() => onBookSelect(book)}>
            <LazyLoadImage
                alt={book.title}
                src={book.img}
                className="card-img-top"
            />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{`Prezzo: ${book.price}€`}</Card.Text>
                <Card.Text>{`Categoria: ${book.category}`}</Card.Text>
                <Button variant="primary">Scopri Di Più 🔍</Button>
            </Card.Body>
        </Card>
    )
}

export default SingleBook
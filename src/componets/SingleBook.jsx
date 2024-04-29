import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import '../CSS/AllTheBooks.css'
import CommentArea from './CommentArea'

class SingleBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            comments: [ 
                // commenti di esempio
                { text: "Da Davide Nardi: Bel libro, lo adoro💘!" },
                { text: "Da Giulio Marra: Lettura molto interessante,consigliato a chiunque sia un epicoder🚀" },
                { text: "prova 3" },
                { text: "Prova 4" }
            ]
        }
    }

    toggleSelect = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }))
    }

    render() {
        const { book } = this.props;
        const { selected, comments } = this.state;
        return (
            <Card className={`mb-4 card-container m-3 ${selected ? 'selected-style' : ''}`}>
                <LazyLoadImage
                    alt={book.title}
                    src={book.img}
                    variant="top"
                    className="card-img-top"
                    onClick={this.toggleSelect} 
                />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{`Prezzo: ${book.price}€`}</Card.Text>
                    <Card.Text>{`Categoria: ${book.category}`}</Card.Text>
                    <Button variant="primary">Scopri Di Più 🔍</Button>
                    {selected && <CommentArea comments={comments} />}
                </Card.Body>
            </Card>
        )
    }
}

export default SingleBook

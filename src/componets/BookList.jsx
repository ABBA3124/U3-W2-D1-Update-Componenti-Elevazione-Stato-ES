import React, { useState } from 'react'
import SingleBook from './SingleBook'
import { Row, Col, Form } from 'react-bootstrap'

function BookList({ books }) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <Form>
                <Form.Group controlId="searchBooks" className='mb-3 ms-4 me-4'>
                    <Form.Label>Cerca Libro</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insert title of the book"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Row>
                {filteredBooks.map((book, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3} className='ciao'>
                        <SingleBook book={book} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default BookList

import React from 'react';
import { ListGroupItem, ListGroup, Container, Row, Col, Button } from 'react-bootstrap';
import { SearchBox } from './common/SearchBox'

export const ProductList = (props) => {
    function showProducts(){

    }
    
    return (
        <div>
            <Container fluid={ true } className="pt-4">
                <Row>
                    <Col xs={1}>
                    </Col>
                    <Col xs={2}>
                        <button className="btn btn-success h6_font_size float-right">New</button>
                    </Col>
                    <Col xs={6}>
                        <SearchBox className="d-flex"></SearchBox>
                    </Col>
                </Row>
            </Container>
            <ListGroup>
                { showProducts() }
            </ListGroup>
        </div>
    )
}
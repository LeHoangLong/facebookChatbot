import React, { useState, useEffect } from 'react';
import { ListGroupItem, ListGroup, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { SearchBox } from './common/SearchBox';
import update from 'update-immutable';
import { getStatus } from './common/utility';

export const ProductList = (props) => {
    let [productId, setProductId] = useState('');
    let [productName, setProductName] = useState('');
    let [productPrice, setProductPrice] = useState(0);
    let [productDescription, setProductDescription] = useState('');
    let [productCurrency, setProductCurrency] = useState('SGD');
    let [showModal, setShowModal] = useState(false);
    let [keyValuePairs, setKeyValuePairs] = useState([]);
    let [error, setError] = useState('');

    function addKeyValue() {
        setKeyValuePairs([...keyValuePairs, {key: '', value: ''}]);
    }

    function handleKeyChange(index, event){
        let value = event.target.value;
        setKeyValuePairs(update(keyValuePairs, {
            [index]: {
                key: {
                    $set: value
                }
            }
        }))
    }

    function handleValueChange(index, event){
        let value = event.target.value;
        setKeyValuePairs(update(keyValuePairs, {
            [index]: {
                value: {
                    $set: value
                }
            }
        }))
    }

    function showKeyValuePairs() {
        let key_value_pairs = [];
        console.log('keyValuePairs');
        console.log(keyValuePairs);
        for (let i = 0; i < keyValuePairs.length; i++){
            key_value_pairs.push(
                <div className="d-flex" key={i}>
                    <Form.Group className="flex-grow-1">
                        <Form.Label>Key {i}</Form.Label>
                        <Form.Control type="text" value={ keyValuePairs[i].key } onChange={(e) => handleKeyChange(i, e)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="flex-grow-1 ml-3">
                        <Form.Label>Value</Form.Label>
                        <Form.Control type="text" value={ keyValuePairs[i].value } onChange={e => handleValueChange(i, e)} ></Form.Control>
                    </Form.Group>
                </div>
            )
        }
        return key_value_pairs;
    }


    function showProducts(){

    }

    function closeModal() {
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    useEffect(() => {
        let status = getStatus(props.status, 'PRODUCT_CREATE_STATUS');
        if (status !== undefined){
            if (status.status === 'SUCCESS'){
                //setProductId('');
                //setProductName('');
                //setProductPrice(0);
                //setProductDescription('');
                //setKeyValuePairs([]);
            }
            
            if (status.status === 'ERROR'){
                setError(status.detail);
            }else{
                setError('');
            }
        }
    }, [props.status])

    function createProduct() {
        let data = {
            number: productId,
            name: productName,
            price: productPrice,
            currency: productCurrency,
            description: productDescription,
            additionalInfo: keyValuePairs,
        }
        props.createProduct(data);
    }
    
    return (
        <div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div onClick={addKeyValue} className="text-primary hoverable_underline cursor_pointer" aria-label="Add key value">
                        <i className="fas fa-plus-circle"></i>
                        <span className="ml-3">
                            Add key value
                        </span>
                    </div>
                    <Form>
                        <Form.Group>
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" placeholder="Unique product id" value={ productId } onChange={e => setProductId(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Unique product name" value={ productName } onChange={e => setProductName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <div className="d-flex">
                            <Form.Group className="flex-grow-1">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" step="0.01" placeholder="Product price" value={ productPrice } onChange={e => setProductPrice(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group className="ml-3">
                                <Form.Label>Currency</Form.Label>
                                <Form.Control as="select" value={ productCurrency } onChange={e => setProductCurrency(e.target.value)}>
                                    <option>VND</option>
                                    <option>SGD</option>
                                    <option>USD</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Description of the product" value={ productDescription } onChange={e => setProductDescription(e.target.value)} ></Form.Control>
                        </Form.Group>
                        { showKeyValuePairs() }
                        <div className="text-danger">
                            { error }
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={ createProduct }>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid={ true } className="pt-4">
                <Row>
                    <Col xs={1}>
                    </Col>
                    <Col xs={2}>
                        <Button variant="success" onClick={openModal} className="h6_font_size float-right">New</Button>
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
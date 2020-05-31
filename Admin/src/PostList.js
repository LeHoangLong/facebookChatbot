import React, { useState, useEffect } from 'react';
import { ListGroupItem, ListGroup, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { SearchBox } from './common/SearchBox';
import update from 'update-immutable';
import { getStatus } from './common/utility';

export const PostList = (props) => {
    let [postContent, setPostContent] = useState('');
    let [showModal, setShowModal] = useState(false);
    let [productReferences, setProductReferences] = useState([]);
    let [error, setError] = useState('');

    function addProductReference() {
        setProductReferences([...productReferences, {category: '', attribute: '', product_name: ''}]);
    }

    function handleProductReferenceCategoryChange(index, event){
        let value = event.target.value;
        setProductReferences(update(productReferences, {
            [index]: {
                category: {
                    $set: value
                }
            }
        }))
    }
    
    function handleProductReferenceAttributeChange(index, event){
        let value = event.target.value;
        setProductReferences(update(productReferences, {
            [index]: {
                attribute: {
                    $set: value
                }
            }
        }))
    }
    
    function handleProductReferenceProductNameChange(index, event){
        let value = event.target.value;
        setProductReferences(update(productReferences, {
            [index]: {
                product_name: {
                    $set: value
                }
            }
        }))
    }

    function showProductReference() {
        let product_reference = [];
        for (let i = 0; i < productReferences.length; i++){
            product_reference.push(
                <div className="d-flex" key={i}>
                    <Form.Group className="flex-grow-1">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={ productReferences[i].category } onChange={(e) => handleProductReferenceCategoryChange(i, e)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="flex-grow-1 ml-3">
                        <Form.Label>Attribute</Form.Label>
                        <Form.Control type="text" value={ productReferences[i].attribute } onChange={(e) => handleProductReferenceAttributeChange(i, e)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="flex-grow-1 ml-3">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="text" value={ productReferences[i].product_name } onChange={e => handleProductReferenceProductNameChange(i, e)} ></Form.Control>
                    </Form.Group>
                </div>
            )
        }
        return product_reference;
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

    function createPost() {
        let postParams = {
            content: postContent,
            product_references: productReferences 
        }
        props.createPost(postParams);
    }
    
    return (
        <div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div onClick={ addProductReference } className="text-primary hoverable_underline cursor_pointer" aria-label="Add key value">
                        <i className="fas fa-plus-circle"></i>
                        <span className="ml-3">
                            Add product reference
                        </span>
                    </div>
                    <Form>
                        <Form.Group>
                            <Form.Label>Post</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Description of the product" value={ postContent } onChange={e => setPostContent(e.target.value)} ></Form.Control>
                        </Form.Group>
                        { showProductReference() }
                        <div className="text-danger">
                            { error }
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ closeModal }>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={ createPost }>
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
                        <SearchBox className="d-flex" onClick={() => {}} ></SearchBox>
                    </Col>
                </Row>
            </Container>
            <ListGroup>
            </ListGroup>
        </div>
    )
}
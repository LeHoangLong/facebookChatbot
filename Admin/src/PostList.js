import React, { useState, useEffect, useRef } from 'react';
import { ListGroupItem, ListGroup, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { SearchBox } from './common/SearchBox';
import update from 'update-immutable';
import { getStatus } from './common/utility';
import { Post } from './Post';

export const PostList = (props) => {
    let [postContent, setPostContent] = useState('');
    let [showModal, setShowModal] = useState(false);
    let [showEditModal, setShowEditModal] = useState(false);
    let [productReferences, setProductReferences] = useState([]);
    let [error, setError] = useState('');
    let [showPostEditIndex, setShowPostEditIndex] = useState(-1);
    let [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    let previousEditIndex = useRef(-1);

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

    function openCloseEditModal( toOpen ) {
        setShowModal(false);
        setShowEditModal(toOpen);
    }

    function closeModal() {
        setShowEditModal(false);
        setShowModal(false);
    }

    function openModal() {
        setShowEditModal(false);
        setShowModal(true);
    }

    useEffect(() => {
        console.log('props.status');
        console.log(props.status);
        let status = getStatus(props.status, 'FACEBOOK_POST_CREATE_STATUS');
        if (status !== undefined){
            if (status.status === 'SUCCESS'){
                setPostContent('');
                setProductReferences([]);
                setSelectedPostIndex(-1);
                previousEditIndex.current = -1;
                setShowEditModal(false);
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

    function updatePost(){
        console.log('selectedPostIndex');
        console.log(selectedPostIndex);
        let postParams = {
            id: props.posts[selectedPostIndex].id,
            content: postContent,
            product_references: productReferences
        }

        props.updatePost(postParams)
    }

    useEffect(() => {
        if (props.active){
            props.getPosts(false);
        }
    }, [props.active]);
    
    function toggleShowEdit(index, val){
        if (val){
            setShowPostEditIndex(index);
        }else{
            setShowPostEditIndex(-1);
        }
    }

    function editClicked( index ){
        setSelectedPostIndex(index);
        setShowPostEditIndex(-1);
        let post = props.posts[index];
        openCloseEditModal(true);
        if ( index !== previousEditIndex.current ){
            setPostContent(post.content);
            setProductReferences(post.product_references);
        }
        previousEditIndex.current = index;
    }

    function displayPosts(){
        let post_list = [];
        for (let i = 0; i < props.posts.length; i++){
            post_list.push(
                <ListGroup.Item key={ props.posts[i].id } style={{ minHeight: '5rem'}} className="p-0">
                    <Post onEditClicked={() => editClicked(i)} onToggleShowEdit={val => toggleShowEdit(i, val)} content={ props.posts[i].content } showEdit={ showPostEditIndex === i }>
                    </Post>
                </ListGroup.Item>
            )
        }
        return post_list;
    }

    return (
        <div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title> New post </Modal.Title>
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

            
            <Modal show={ showEditModal } onHide={ () => openCloseEditModal(false) }>
                <Modal.Header closeButton>
                    <Modal.Title> Edit post </Modal.Title>
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
                    <Button variant="secondary" onClick={ () => openCloseEditModal(false) }>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={ updatePost }>
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
                    <Col xs={4}>
                        <SearchBox className="d-flex" onClick={() => {}} ></SearchBox>
                    </Col>
                    <Col xs={2}>
                        <Button variant="success" className="h6_font_size float-left ml-2" onClick={() => props.getPosts(true) }>Refresh post</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="success" className="h6_font_size float-left ml-2">Check comment</Button>
                    </Col>
                </Row>
            </Container>
            <div className="d-flex justify-content-center mt-4">
                <ListGroup className="w-50">
                    { displayPosts() }
                </ListGroup>
            </div>
        </div>
    )
}
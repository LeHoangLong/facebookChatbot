import React, { Component, useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Row, Col, NavDropdown, Dropdown, Button } from 'react-bootstrap';
import { NavigationBar } from './common/NavigationBar';
import { Page } from './common/Page'
import Axios from 'axios';
import { facebookInit, facebookLogin, getStatus } from './common/utility';
import { ProductListContainer } from './ProductListContainer';
import { PostListContainer } from './PostListContainer';
import { Status } from './actions/status';
import { BACKEND_URL, FRONTEND_URL } from './common/config'


export const DashBoard = (props) => {
    let [showMenu, setShowMenu] = useState(false);
    let [showMenuLeftPos, setShowMenuLeftPos] = useState(25);
    let [backgroundDarkenOpacity, setBackgroundDarkenOpacity] = useState(0);
    let previousStatus = useRef(Status.IDLE);

    useEffect(() => {
        props.checkIfLoggedIn();
        props.getCsrfToken();
    }, []);

    function logInFacebook(){
    	facebookInit(() => {
	    facebookLogin().then(res => {
		console.log('res');
		console.log(res);
		let facebook_token = res.accessToken;
		return Axios.post(`${BACKEND_URL}/facebook_login_token`, {
		    'token': facebook_token,
		})
	    })
	});
    }

    useEffect(() => {
        let current_status = getStatus(props.status, 'LOGIN_STATUS');
        if (current_status!== undefined){
            if (current_status.status === Status.ERROR && previousStatus.current !== current_status.status){
                console.log('logging in facebook');
            }
            previousStatus.current = current_status.status;
        }
    }, [props.status]);


    useEffect(() => {
        if (showMenu){
            if (showMenuLeftPos - 1 > 0){
                setTimeout(() => {
                    setShowMenuLeftPos(showMenuLeftPos - 1);
                    setBackgroundDarkenOpacity(backgroundDarkenOpacity + 0.02);
                }, 5);
                
            }else{
                setTimeout(() => {
                    setShowMenuLeftPos(0);
                }, 5);
            }
            
        }else{
            if (showMenuLeftPos + 1 < 25){
                setTimeout(() => {
                    setShowMenuLeftPos(showMenuLeftPos + 1);
                    if (backgroundDarkenOpacity > 0){
                        setBackgroundDarkenOpacity(backgroundDarkenOpacity - 0.02);
                    }
                }, 5);
            }else{
                setTimeout(() => {
                    setShowMenuLeftPos(25);
                }, 5);
            }
        }
    }, [showMenu, showMenuLeftPos]);


    useEffect(() => {
        props.goToPage('PRODUCT_PAGE');
    }, [])

    useEffect(() => {
    }, []);

    function selectPage(page_name){
        props.goToPage(page_name);
        setShowMenu(false);
    }

    function displayPageNames(pages, current_page_id){
        let page_name_list = [];
        for (let i = 0; i < pages.length; i++){
            let page_name = pages[i].name;
            let page_id = pages[i].id;
            let selected_class = page_id === current_page_id? "selected" : '';
            page_name_list.push(
                <nav key={page_id} className={`p-4 hoverable ${selected_class}`} onClick={() => selectPage(page_id)}>{page_name}</nav>
            )
        }
        return page_name_list;
    }

    function displayPageHeader(pages, current_page_id){
        for (let i = 0; i < pages.length; i++){
            let page_name = pages[i].name;
            let page_id = pages[i].id;
            if (page_id === current_page_id){
                return (
                    <h3>{page_name}</h3>
                )
            }
        }
    }


    let pages = [
        {
            name: 'Products',
            id: 'PRODUCT_PAGE'
        },
        {
            name: 'Posts',
            id: 'POST_PAGE'
        }
    ]

    return (
        <article className="position-relative fixed_height_100_vh">
            <div className="absolute_left_edge w-25 fixed_height_100_vh bg-white z_index_2" style={{ left: `-${showMenuLeftPos}%`}}>
                <button aria-label="collapse menu" className="border-0 p-4 bg-white" onClick={() => {setShowMenu(false)}}>
                    <i className="fas fa-arrow-left h6_font_size"></i>
                </button>
                { displayPageNames(pages, props.current_page) }
            </div>
            <div className="fixed_height_100_vh fixed_with_100_vw z_index_1 position-absolute bg-secondary" style={{ opacity: backgroundDarkenOpacity, pointerEvents: showMenu? 'auto' : 'none' }}></div>
            <Container fluid={ true } className="border-bottom">
                <Row style={{ backgroundColor: '#f8f9fa'}} className="border-bottom">
                    <Col xs={ 1 } className="p-0">
                        <button aria-label="expand menu" className="border-0 p-4 w-100 d-flex justify-content-center bg-light" onClick={() => {setShowMenu(true)}}>
                            <i className="fas fa-bars h6_font_size"></i>
                        </button>
                    </Col>
                    <Col xs={ 9 } className="p-0 d-flex align-items-center">
                        {/*
                            <NavigationBar textClass="h6_font_size" activeStyle={{backgroundColor: '#dedede'}} inactiveStyle={{ backgroundColor: '#faf8f9'}} currentPage={ currentPage } pages={ headers } goToPage={i => setCurrentPage(headers[i].id[0])}></NavigationBar>
                        */}
                        { displayPageHeader(pages, props.current_page) }
                    </Col>
	    	    <Col xs={ 2 } className="p-0 d-flex justify-content-end">
	    	        <Button variant="primary" onClick={ logInFacebook }>
	                    Log in
	                </Button>
	    	    </Col>
                </Row>
            </Container>
            <Page pageName="PRODUCT_PAGE" currentPage={ props.current_page }>
                <ProductListContainer active={ true }></ProductListContainer>
            </Page>
            <Page pageName="POST_PAGE" currentPage={ props.current_page }>
                <PostListContainer active={ true }></PostListContainer>
            </Page>
        </article>
    )
}

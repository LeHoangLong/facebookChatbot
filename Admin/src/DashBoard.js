import React, { Component, useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Row, Col, NavDropdown, Dropdown } from 'react-bootstrap';
import { NavigationBar } from './common/NavigationBar';
import './common/common.css';
import './common/reset.css';
import { Page } from './common/Page'
import Axios from 'axios';
import { facebookInit, facebookLogin, getStatus } from './common/utility';
import { ProductListContainer } from './ProductListContainer';
import { Status } from './actions/status';
import { BACKEND_URL, FRONTEND_URL } from './common/config'


export const DashBoard = (props) => {
    let [showMenu, setShowMenu] = useState(false);
    let [showMenuLeftPos, setShowMenuLeftPos] = useState(25);
    let [backgroundDarkenOpacity, setBackgroundDarkenOpacity] = useState(0);
    let [currentPage, setCurrentPage] = useState('PRODUCT_PAGE');
    let previousStatus = useRef(Status.IDLE);

    useEffect(() => {
        props.checkIfLoggedIn();
        props.getCsrfToken();
    }, []);

    useEffect(() => {
        let current_status = getStatus(props.status, 'LOGIN_STATUS');
        if (current_status!== undefined){
            if (current_status.status === Status.ERROR && previousStatus.current !== current_status.status){
                console.log('logging in facebook');
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
        let interval;
        if (currentPage == 'PRODUCT_PAGE'){
            interval = setInterval(() => {
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [currentPage])

    useEffect(() => {
    }, []);

    return (
        <article className="position-relative fixed_height_100_vh">
            <div className="absolute_left_edge w-25 fixed_height_100_vh bg-white z_index_2" style={{ left: `-${showMenuLeftPos}%`}}>
                <button aria-label="collapse menu" className="border-0 p-4 bg-white" onClick={() => {setShowMenu(false)}}>
                    <i className="fas fa-arrow-left h6_font_size"></i>
                </button>
                <nav className="p-4 hoverable">Products</nav>
                <nav className="p-4 hoverable">Services</nav>
                <nav className="p-4 hoverable">Receptionists</nav>
            </div>
            <div className="fixed_height_100_vh fixed_with_100_vw z_index_1 position-absolute bg-secondary" style={{ opacity: backgroundDarkenOpacity, pointerEvents: showMenu? 'auto' : 'none' }}></div>
            <Container fluid={ true } className="border-bottom">
                <Row style={{ backgroundColor: '#f8f9fa'}} className="border-bottom">
                    <Col xs={ 1 } className="p-0">
                        <button aria-label="expand menu" className="border-0 p-4 w-100 d-flex justify-content-center bg-light" onClick={() => {setShowMenu(true)}}>
                            <i className="fas fa-bars h6_font_size"></i>
                        </button>
                    </Col>
                    <Col xs={ 11 } className="p-0 d-flex align-items-center">
                        {/*
                            <NavigationBar textClass="h6_font_size" activeStyle={{backgroundColor: '#dedede'}} inactiveStyle={{ backgroundColor: '#faf8f9'}} currentPage={ currentPage } pages={ headers } goToPage={i => setCurrentPage(headers[i].id[0])}></NavigationBar>
                        */}
                        <h3> Products123 </h3>
                    </Col>
                </Row>
            </Container>
            <Page pageName="PRODUCT_PAGE" currentPage={ currentPage }>
                <ProductListContainer active={ currentPage === 'PRODUCT_PAGE'? true : false}></ProductListContainer>
            </Page>
        </article>
    )
}
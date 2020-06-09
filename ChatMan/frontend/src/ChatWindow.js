import React, { useState, useEffect } from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import { BACKEND_URL } from './common/config';
import { getStatus } from './common/utility';

export const ChatWindow = (props) => {
    let  [messageList, setMessageList] = useState([]);

    function getPendingMessages() {
        Axios.get(`${BACKEND_URL}/pending_conversations`, {
            
        }).then(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        console.log('props.status');
        console.log(props.status);
        let status = getStatus(props.status, 'LOGIN_STATUS')
        if (status && status.status === 'SUCCESS'){
            getPendingMessages();
            let interval = setInterval(() => {
                //getPendingMessages();
            }, 50000);
            
            return () => clearInterval(interval);
        }
    }, [props.status])

    return (
        <Container fluid={true} className="fixed_height_100_vh">
            <Row className="h-100">
                <Col xs={4} lg={3} className="border_1px p-0">
                    <div className="p-4 main_color">
                        Messages
                    </div>
                </Col>
                <Col xs={8} lg={9} className="border_1px p-0">
                </Col>
            </Row>
        </Container>
    )
}
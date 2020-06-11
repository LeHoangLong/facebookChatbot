import React, { useState, useEffect, useRef } from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Axios from 'axios';
import { BACKEND_URL } from './common/config';
import { getStatus } from './common/utility';
import './ChatWindow.css'

export const ChatWindow = (props) => {
    let [messageList, setMessageList] = useState([]);
    let [selectedConversationId, setSelectedConversationId] = useState(null);
    let [chatHeight, setChatHeight] = useState(0);
    let [draftMessage, setDraftMessage] = useState('');

    const chatElement = useRef(null);

    function calculateChatHeight(){
        let vh_height = window.innerHeight;
        let rect = chatElement.current.getBoundingClientRect();
        let remaining_height = vh_height - rect.y;
        setChatHeight(remaining_height);
    }
    useEffect(() => {
        calculateChatHeight();
        window.addEventListener('resize', () => {
            calculateChatHeight()
        })
    }, [props.pending_conversations, props.messages]);

    useEffect(() => {
        let status = getStatus(props.status, 'LOGIN_STATUS')
        if (status && status.status === 'SUCCESS'){
            props.getPendingConversations();
            let interval = setInterval(() => {
                //props.getPendingConversations();
            }, 50000);
            
            return () => clearInterval(interval);
        }
    }, [props.status])

    function selectConversation(index) {
        if (index < props.pending_conversations.length){
            let conversation_id = props.pending_conversations[index].id;
            props.getMessagesOfConversation(conversation_id);
            setSelectedConversationId(conversation_id);
        }
    }

    useEffect(() => {
        let selected_conversation_index = props.pending_conversations.findIndex(e => e.id === selectedConversationId); 
        if (selected_conversation_index === -1){
            selectConversation(0);
        }
    }, [props.pending_conversations])

    useEffect(() => {
        /*
        let interval = setInterval(() => {
            if (selectedConversationId){
                props.getMessagesOfConversation(selectedConversationId);
            }
        }, 1000);
        return () => clearInterval(interval);
        */
    }, [selectedConversationId])

    function displayPendingConversations() {
        let pending_conversations_list = [];

        let selected_conversation_index = props.pending_conversations.findIndex(e => e.id === selectedConversationId); 
        if (selected_conversation_index === -1){
            selected_conversation_index = 0;
        }

        for (let i = 0; i < props.pending_conversations.length; i++){

            let selected_class = 'light';
            if (selected_conversation_index === i){
                selected_class = 'secondary';
            }

            pending_conversations_list.push(
                <ListGroup.Item variant={ selected_class } onClick={e => selectConversation(i) } key={ props.pending_conversations[i].id } className={`border_right_0px d-flex w-100 border_bottom hoverable cursor_pointer rounded-0`} style={{ maxHeight: '76px', minWidth: '37px'}}>
                    <div className="p-0 d-flex align-items-center justify-content-center font-weight-bold rounded-circle bg-secondary mr-3 text-center" style={{ height: '50px', width: '50px', fontSize: '1.75rem', minWidth: '50px' }}>
                        { props.pending_conversations[i].latest_message.author_name[0] }
                    </div>
                    <div className="p-0 flex-column justify-content-center hide_when_screen_small" style={{ maxWidth: '75%' }}>
                        <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className='h7_font_size font-weight-bold'>
                            { props.pending_conversations[i].latest_message.author_name }
                        </div>
                        <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                            { props.pending_conversations[i].latest_message.content }
                        </div>
                    </div>
                </ListGroup.Item>
            )
        }

        return pending_conversations_list;
    }

    function displayMessage(){
        let message_array = [];
        for (let i = props.messages.length - 1; i >= 0; i--){
            let flex_direction = props.messages[i].is_mine? 'flex-row-reverse' : '';
            let message_style = props.messages[i].is_mine? { 
                backgroundColor: '#4188fa',
                borderTopRightRadius: '10px', 
                borderBottomLeftRadius: '10px' 
            } : {
                backgroundColor: '#ebeced',
                borderTopLeftRadius: '10px', 
                borderBottomRightRadius: '10px',
            };
            message_array.push(
                <div className={`d-flex ${flex_direction} m-1 pl-4 pr-4 mr-2`} key={ props.messages[i].id } style={{ minWidth: '150px' }}>
                    <div style={{ maxWidth: '75%' }}>
                        <div>
                            {
                                (() => {
                                    if (!props.messages[i].is_mine){
                                            if (i === 0 || props.messages[i - 1].author_name !== props.messages[i].author_name){
                                                return (
                                                    <div style={{ fontSize: '0.8em'}} className="p-2 mt-2 font-weight-light">
                                                    { props.messages[i].author_name }
                                                </div>
                                            )
                                        }
                                    }else{
                                        if (props.messages[i].status === 'SENDING'){
                                            return (
                                                <div className="font-weight-light" style={{ fontSize: '0.8em'}}>
                                                    Sending
                                                </div>
                                            )
                                        }
                                    }
                                })()
                            }
                        </div>
                        <div className="">
                            <div className="p-2 message_border" style={ message_style }>
                                { props.messages[i].content }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return message_array
    }

    function sendMessage(){
        props.sendMessage(selectedConversationId, draftMessage);
        setDraftMessage('');
    }

    function displaySendingMessages(){
        let message_array = [];
        for (let i = props.sending_messages.length - 1; i >= 0; i--){
            message_array.push(
                <div className={`d-flex flex-column align-items-end m-1 pl-4`} key={ props.messages[i].id } style={{ maxWidth: '75%', minWidth: '300px' }}>
                    <div className="font-weight-light" style={{ fontSize: '0.8em'}}>
                        Sending
                    </div>
                    <div className="p-2 message_border" style={{ backgroundColor: '#4188fa', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px' }}>
                        { props.sending_messages[i].content }
                    </div>
                </div>
            )
        }
        return message_array
    }

    return (
        <div  ref={chatElement} className="d-flex" style={{ maxHeight: '100%' }}>
            <div className="border_1px p-0 overflow-hidden banner" style={{ flex: '0 0 25%' }}>
                <div className="p-4 main_color border_right_0px hide_when_screen_small" style={{ display: 'none' }}>
                    Messages
                </div>
                <ListGroup>
                    { displayPendingConversations() }
                </ListGroup>
            </div>
            <div className="border_1px p-0 d-flex flex-column-reverse overflow_y_scroll scrollbar scrollbar-primary"  style={{ flexGrow: 3, maxHeight: `${chatHeight}px` }}>
                <div className="pt-2 pb-2 pl-4 pr-4 d-flex">
                    <textarea onChange={e => setDraftMessage(e.target.value)} value={draftMessage} rows={1} className="bg-light no_outline flex-grow-1 mr-4 pl-3 pt-2 pb-2" placeholder='Type a message' style={{ borderRadius: '10px', resize: 'none' }}></textarea>
                    <Button onClick={() => sendMessage()} variant="primary">Send</Button>
                </div>
                { displayMessage() }
            </div>
        </div>
    )
}
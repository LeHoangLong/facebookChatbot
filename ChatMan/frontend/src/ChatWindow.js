import React, { useState, useEffect, useRef } from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Axios from 'axios';
import { BACKEND_URL } from './common/config';
import { getStatus } from './common/utility';
import './ChatWindow.css'
import './common/common.css';

export const ChatWindow = (props) => {
    let [messageList, setMessageList] = useState([]);
    let [selectedConversationId, setSelectedConversationId] = useState(null);
    let [chatHeight, setChatHeight] = useState(0);
    let [draftMessage, setDraftMessage] = useState('');
    let [isConversationJoint, setIsConversationJoint] = useState(false);
    let [displayMessageHeight, setDisplayMessageHeight] = useState(0);

    const chatElement = useRef(null);
    const textareaElement = useRef(null);
    const joinNowElement = useRef(null); 

    function calculateChatHeight(){
        let vh_height = window.innerHeight;
        let rect = chatElement.current.getBoundingClientRect();
        let remaining_height = vh_height - rect.y;
        setChatHeight(remaining_height);

        let text_area_height = textareaElement.current.getBoundingClientRect().height;
        let join_now_height = joinNowElement.current.getBoundingClientRect().height;

        let display_message_height = remaining_height - text_area_height - join_now_height;

        setDisplayMessageHeight(display_message_height);
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
            props.getConversations();
            props.getPendingConversations();
            let interval = setInterval(() => {
                //props.getPendingConversations();
            }, 50000);
            
            return () => clearInterval(interval);
        }
    }, [props.status])

    
    
    function selectPendingConversation(index) {
        if (index < props.pending_conversations.length){
            setIsConversationJoint(false);
            let conversation_id = props.pending_conversations[index].id;
            props.getMessagesOfConversation(conversation_id);
            setSelectedConversationId(conversation_id);
        }
    }

    function selectConversation(index) {
        if (index < props.conversations.length){
            setIsConversationJoint(true);
            let conversation_id = props.conversations[index].id;
            props.getMessagesOfConversation(conversation_id);
            setSelectedConversationId(conversation_id);
        }
    }

    useEffect(() => {
        if (props.conversations.length > 0){
            let selected_conversation_index = props.conversations.findIndex(e => e.id === selectedConversationId); 
            if (selected_conversation_index === -1){
                selectConversation(0);
            }
        }else if (props.pending_conversations.length > 0){
            let selected_conversation_index = props.pending_conversations.findIndex(e => e.id === selectedConversationId); 
            if (selected_conversation_index === -1 && props.pending_conversations.length > 0){
                selectPendingConversation(0);
            }
        }
    }, [props.conversations, props.pending_conversations])

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

    function createConversation( index, conversation, variant, selectHandler ){
        return (
            <ListGroup.Item variant={ variant } onClick={e => selectHandler(index) } key={ conversation.id } className={`border_right_0px d-flex w-100 border_bottom hoverable cursor_pointer rounded-0`} style={{ maxHeight: '76px', minWidth: '37px', borderWidth: '0px', border: '0px transparent grey'}}>
                <div className="p-0 d-flex align-items-center justify-content-center font-weight-bold rounded-circle bg-secondary mr-3 text-center" style={{ height: '50px', width: '50px', fontSize: '1.75rem', minWidth: '50px', color: 'black' }}>
                    { conversation.latest_message.author_name[0] }
                </div>
                <div className="p-0 flex-column justify-content-center hide_when_screen_small" style={{ maxWidth: '75%' }}>
                    <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className='h7_font_size font-weight-bold'>
                        { conversation.latest_message.author_name }
                    </div>
                    <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        { conversation.latest_message.content }
                    </div>
                </div>
            </ListGroup.Item>
        )
    }

    function displayPendingConversations() {
        let conversations_list = [];

        for (let i = 0; i < props.conversations.length; i++){
            let selected_class = 'light';
            if (props.conversations[i].id === selectedConversationId){
                selected_class = 'secondary';
            }
            conversations_list.push(createConversation( i, props.conversations[i], selected_class, selectConversation));
        }

        for (let i = 0; i < props.pending_conversations.length; i++){
            let selected_class = 'light';
            if (props.pending_conversations[i].id === selectedConversationId){
                selected_class = 'secondary';
            }
            conversations_list.push(createConversation( i, props.pending_conversations[i], selected_class, selectPendingConversation));
        }
        return conversations_list;
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
                <div className={`d-flex ${flex_direction} m-1 pl-4 pr-4 mr-0`} key={ props.messages[i].id } style={{ minWidth: '150px' }}>
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

    function keyUpHandler(event){
        if (event.keyCode === 13 && !event.shiftKey){
            sendMessage();
            event.stopPropagation();
        }
    }

    function keyDownHandler(event){
        if (event.keyCode === 13 && !event.shiftKey){
            event.stopPropagation();
        }
    }

    function displayJoinNowButton(){
        let selected_conversation_index = props.pending_conversations.findIndex(e => e.id === selectedConversationId); 
        if (selected_conversation_index !== -1){
            if (props.pending_conversations[selected_conversation_index].status === 'JOINING'){
                return (
                    <Button disabled={ true } variant="primary" className="m-4" onClick={() => props.joinConversation( selectedConversationId )}>
                        Joining
                    </Button>
                ) 
            }else{
                return (
                    <Button variant="primary" className="m-4" onClick={() => props.joinConversation( selectedConversationId )}>
                        Join now
                    </Button>
                )
            }
        }

    }

    let display_text_area = isConversationJoint? 'flex' : 'none';
    let display_close_conversation_button = isConversationJoint? 'flex' : 'none';
    let display_join_now_button = isConversationJoint? 'none': 'flex';
    

    return (
        <div  ref={chatElement} className="d-flex" style={{ height: '100%', maxHeight: '100%' }}>
            <div className="border_1px p-0 overflow-hidden banner" style={{ flex: '0 0 25%', maxHeight: `${chatHeight}px` }}>
                <ListGroup>
                    { displayPendingConversations() }
                </ListGroup>
            </div>
            <div className="border_1px p-0 d-flex flex-column-reverse overflow_y_scroll "  style={{ flexGrow: 3, maxHeight: `${chatHeight}px` }}>
                <div ref={ textareaElement } className="pt-2 pb-2 pl-4 pr-4" style={{ display: display_text_area }}>
                    <textarea onKeyDown={e => keyDownHandler} onKeyUp={e => keyUpHandler(e)} onChange={e => setDraftMessage(e.target.value)} value={draftMessage} rows={1} className="bg-light no_outline flex-grow-1 mr-4 pl-3 pt-2 pb-2" placeholder='Type a message' style={{ borderRadius: '10px', resize: 'none' }}></textarea>
                    <Button onClick={() => sendMessage()} variant="primary">Send</Button>
                </div>
	    	<div className="flex-grow-1 d-flex flex-column-reverse scrollbar scrollbar-primary" style={{ maxHeight: `${displayMessageHeight}px`}}>
			    { displayMessage() }
	    	</div>
	    	<div  ref={ joinNowElement } >
                <div className="w-100 justify-content-center bg-light border-bottom" style={{ display: display_join_now_button }}>
                    { displayJoinNowButton() }
                    <div className="m-4 d-flex align-items-center">
                        This user is pending support
                    </div>
                </div>
                
                <div className="w-100 justify-content-end bg-light border-bottom" style={{ display: display_close_conversation_button }}>
                    <Button variant="primary" className="mt-2 mb-2 ml-2 mr-4 my_tooltip" onClick={() => props.closeConversation( selectedConversationId )}>
                        Close
                        <div className="m-2 my_tooltip_text bg-dark p-2 border_radius_10px">
                            Click to close this conversation once the issue has been resolved
                        </div>
                    </Button>
                    
                </div>
	    	</div>
            </div>
        </div>
    )
}

import Axios from 'axios';
import {BACKEND_URL} from '../common/config';

export const setConversations = (conversations) => ({
    type: 'SET_CONVERSATIONS',
    payload: conversations
})

export const setPendingConversations = (pending_conversations) => ({
    type: 'SET_PENDING_CONVERSATIONS',
    payload: pending_conversations
})

export const setMessages = (messages) => ({
    type: 'SET_MESSAGES',
    payload: messages
})

export const addSendingMessage = (id, message) => ({
    type: 'ADD_SENDING_MESSAGE',
    payload: {
        content: message,
        id: id,
    }
})

export const setConversationStatus = ( conversation_id, status ) => ({
    type: 'SET_CONVERSATION_STATUS',
    payload: {
        id: conversation_id,
        status: status
    } 
})

export const removeSendingMessage = (id) => ({
    type: 'REMOVE_SENDING_MESSAGE',
    payload: {
        id: id,
    }
})

export const sendMessage = (conversation_id, message) => {
    return dispatch => {
        let id = Date.now();
        dispatch(addSendingMessage(id, message));
        Axios.post(`${BACKEND_URL}/messages`, {
            message: message,
            timestamp: Date.now(),
            conversation: conversation_id
        }).then(res => {
            removeSendingMessage(id);
            dispatch(getMessagesOfConversation(conversation_id));
        })
    }
}

export const getPendingConversations = () => {
    return dispatch => {
        Axios.get(`${BACKEND_URL}/pending_conversations`).then(res => {
            let pending_list_data = res.data;
            pending_list_data = pending_list_data.sort(( a, b) => {
                return a.latest.updatedAt - b.latest.updatedAt;
            }).reverse();
            dispatch(setPendingConversations(pending_list_data))
        })
    }
}


export const getConversations = () => {
    return dispatch => {
        Axios.get(`${BACKEND_URL}/conversations`).then(res => {
            console.log('res');
            console.log(res);
            let conversation_list = res.data;
            conversation_list = conversation_list.sort(( a, b) => {
                return a.latest.updatedAt - b.latest.updatedAt;
            }).reverse();
            dispatch(setConversations(conversation_list))
        })
    }
}

export const getMessagesOfConversation = (conversation_id) => {
    return dispatch => {
        Axios.get(`${BACKEND_URL}/messages`, {
            params: {
                conversation_id: conversation_id
            }
        }).then(res => {
            dispatch(setMessages(res.data));
        })
    }
}

export const joinConversation = conversation_id => {
    return dispatch => {
        dispatch(setConversationStatus(conversation_id, 'JOINING'));
        Axios.post(`${BACKEND_URL}/conversations`, {
            conversation_id: conversation_id
        }).then(res => {
            console.log('res');
            console.log(res);
        })
    }
}

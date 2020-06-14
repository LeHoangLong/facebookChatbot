import update from 'update-immutable';
import { createReducers } from '../common/utility';

const initialState = {
    pending_conversations: [],
    conversations: [],
    messages: [],
    sending_messages: [],
}

function setConversationStatus(state, action){
    let conversation_index = state.pending_conversations.findIndex(e => e.id === action.payload.id );
    if (conversation_index !== -1){
        let new_state = update(state, {
            pending_conversations: {
                [conversation_index]: {
                    status: {
                        $set: action.payload.status
                    }
                }
            }
        })
        return new_state;
    }else{
        return state;
    }
}

function setPendingConversations(state, action){
    let new_state = update(state, {
        pending_conversations: {
            $set: action.payload
        }
    })
    return new_state;
}

function setConversations(state, action){
    let new_state = update(state, {
        conversations: {
            $set: action.payload
        }
    })
    return new_state;
}

function setCurrentMessages(state, action){
    let new_state = update(state, {
        messages: {
            $set: action.payload
        }
    })
    new_state.messages.sort((a, b) => a.createdAt - b.createdAt);
    return new_state;
}

function addSendingMessage(state, action){
    let new_state = update(state, {
        messages: {
            $push: [{
                id: action.payload.id,
                content: action.payload.content,
                status: 'SENDING',
                is_mine: true,
                author_name: '',
                createdAt: Date.now()
            }]
        }
    });
    return new_state;
}

export const conversationReducers = createReducers(initialState, {
    SET_PENDING_CONVERSATIONS: setPendingConversations,
    SET_MESSAGES: setCurrentMessages,
    ADD_SENDING_MESSAGE: addSendingMessage,
    SET_CONVERSATION_STATUS: setConversationStatus,
    SET_CONVERSATIONS: setConversations
});

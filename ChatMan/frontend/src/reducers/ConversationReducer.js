import update from 'update-immutable';
import { createReducers } from '../common/utility';

const initialState = {
    pending_conversations: [],
    conversations: [],
    messages: [],
    sending_messages: [],
}

function setConversationStatus(state, action){
    let conversation_index = state.conversations.findIndex(e => e.id === action.payload.id );
    let pending_conversation_index = state.pending_conversations.findIndex(e => e.id === action.payload.id );
    if (conversation_index !== -1){
        let new_state = update(state, {
            conversations: {
                [conversation_index]: {
                    status: {
                        $set: action.payload.status
                    }
                }
            }
        })
        return new_state;
    }else if (pending_conversation_index !== -1){
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

function movePendingConversationToJoint(state, action){
    let conversation_id = action.payload;
    let conversation_index = state.pending_conversations.findIndex(e => e.id === conversation_id);
    if (conversation_index !== -1){
        let new_state = update(state, {
            pending_conversations: {
                $splice: [[conversation_index, 1]]
            },
            conversations: {
                $push: [state.pending_conversations[conversation_index]]
            }
        });
        new_state.conversations.sort((a, b) => -(a.updatedAt - b.updatedAt));
        return new_state;
    }else{
        return state;
    }
}

function removeConversation(state, action){
    let conversation_id = action.payload;
    let conversation_index = state.conversations.findIndex(e => e.id === conversation_id);
    let pending_conversation_index = state.pending_conversations.findIndex(e => e.id === conversation_id);
    let conversation_type = conversation_index !== -1? 'conversations' : pending_conversation_index !== -1? 'pending_conversations' : null;
    let index = conversation_index !== -1? conversation_index : pending_conversation_index !== -1? pending_conversation_index : null;
    if (conversation_type){
        console.log('ok');
        let new_state = update(state, {
            [conversation_type]: {
                $splice: [[index, 1]]
            }
        })
        console.log('new_state');
        console.log(new_state);
        return new_state;
    }else{
        return state;
    }
}

export const conversationReducers = createReducers(initialState, {
    SET_PENDING_CONVERSATIONS: setPendingConversations,
    SET_MESSAGES: setCurrentMessages,
    ADD_SENDING_MESSAGE: addSendingMessage,
    SET_CONVERSATION_STATUS: setConversationStatus,
    SET_CONVERSATIONS: setConversations,
    MOVE_PENDING_CONVERSATION_TO_JOINT: movePendingConversationToJoint,
    REMOVE_CONVERSATION: removeConversation
});

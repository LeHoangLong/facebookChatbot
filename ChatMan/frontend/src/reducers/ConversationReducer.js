import update from 'update-immutable';
import { createReducers } from '../common/utility';

const initialState = {
    pending_conversations: []
}

function setPendingConversations(state, action){
    let new_state = update(state, {
        pending_conversations: {
            $set: action.payload
        }
    })
    return new_state;
}

export const conversationReducers = createReducers(initialState, {
    SET_PENDING_CONVERSATIONS: setPendingConversations
});

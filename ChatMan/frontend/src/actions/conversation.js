import Axios from 'axios';
import {BACKEND_URL} from '../common/config';

export const setPendingConversations = (pending_conversations) => ({
    type: 'SET_PENDING_CONVERSATIONS',
    payload: pending_conversations
})

export const getPendingConversations = () => {
    return dispatch => {
        Axios.get(`${BACKEND_URL}/pending_conversations`).then(res => {
            console.log(res);
            let pending_list_data = res.data;
            pending_list_data = pending_list_data.sort(( a, b) => {
                return a.latest.updatedAt - b.latest.updatedAt;
            }).reverse();
            dispatch(setPendingConversations(pending_list_data))
        })
    }
}


import update from 'update-immutable';
import { createReducers } from '../common/utility'

const initialState = {
    posts: [],
}

function setPosts(state, action) {
    const new_obj = update(state, {
        posts: {
            $set: action.payload
        }
    })
    return new_obj;
}

export const postReducers = createReducers(initialState, {
    SET_POSTS: setPosts
})
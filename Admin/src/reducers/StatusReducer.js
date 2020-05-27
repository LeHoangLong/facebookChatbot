import update from 'update-immutable';
import { createReducers } from '../common/utility';

const initialState = {

}

function setStatus(state, action){
    let new_state = update(state, {
        [action.payload.name]: {
            status: {
                $set: action.payload.status
            },
            detail: {
                $set: action.payload.detail !== undefined? action.payload.detail : state[action.payload.name].detail
            }
        }
    })
    return new_state;
}

export const stateReducers = createReducers(initialState, {
    SET_STATUS: setStatus
});

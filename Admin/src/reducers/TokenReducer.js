import update from 'update-immutable';
import { createReducers } from '../common/utility'

const initialState = {

}

const setToken = (state, action) => {
    const new_state = update(state, {
        [action.payload.name]: {
            value: {
                $set: action.payload.value
            }
        }
    });
    if (new_state !== state){
        console.log('is different')
    }else{
        console.log('not different')
    }
    return new_state;
}

const setTokenExpiryTime = (state, action) => {
    const new_state = update(state, {
        [action.payload.name]: {
            expiry: {
                $set: action.payload.value
            }
        }
    });
    if (new_state !== state){
        console.log('is different')
    }else{
        console.log('not different')
    }
    return new_state;
}

export const tokenReducers = createReducers(initialState, {
    SET_TOKEN: setToken,
    SET_TOKEN_EXPIRY: setTokenExpiryTime
})

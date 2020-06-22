import update from 'update-immutable';
import { createReducers } from '../common/utility'

const initialState = {
    products: [],
}

function setProducts(state, action) {
    const new_obj = update(state, {
        products: {
            $set: action.payload
        }
    })
    return new_obj;
}

export const productReducers = createReducers(initialState, {
    SET_PRODUCTS: setProducts
})
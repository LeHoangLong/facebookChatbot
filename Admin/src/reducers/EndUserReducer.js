import update from 'immutability-helper';
import { createReducers } from '../common/utility'

const initialState = {
    current_menu_index: 0,
    submitting_order: false
}

function submitOrder(state, action){
    var new_obj = {
        ...state,
        submitting_order: action.payload
    }
    return new_obj;
}

function selectMenu(state, action){
    return Object.assign({}, state, {
        current_menu_index: action.payload
    })
}

function updateMenu(state, action){
    return Object.assign({}, state, {
        current_menu_index: 0
    })
}

export const endUserReducers = createReducers(initialState, {
    SELECT_TAB: selectMenu,
    SUBMITTING_ORDER: submitOrder,
    UPDATE_MENU: updateMenu
})
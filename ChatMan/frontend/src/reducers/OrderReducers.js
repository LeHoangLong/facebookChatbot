import update from 'update-immutable';
import { createReducers } from '../common/utility';

const initialState = {
    current_orders: [],
    current_order_page_number: 1,
    number_of_current_order_pages: 0
}

function setOrders(state, action){
    let new_state = update(state, {
        current_orders: {
            $set: action.payload
        }
    })
    return new_state;
}

function setNumberOfCurrentOrderPages(state, action){
    let new_state = update(state, {
        number_of_current_order_pages: {
            $set: action.payload
        }
    })
    return new_state;
}

function setCurrentOrderPageNumber(state, action){
    let new_state = update(state, {
        current_order_page_number: {
            $set: action.payload
        }
    })
    return new_state;
}

export const orderReducers = createReducers(initialState, {
    SET_ORDERS: setOrders,
    SET_CURRENT_ORDER_PAGE_NUMBER: setCurrentOrderPageNumber,
    SET_NUMBER_OF_CURRENT_ORDER_PAGES: setNumberOfCurrentOrderPages
});

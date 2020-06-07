import update from 'immutability-helper';
import { createReducers } from '../common/utility'

const initialState = {
    manager_name: '',
    menus: []
}

function setManagerName(state, action) {
    const new_state = {
        ...state,
        manager_name: action.payload
    }
    return new_state;
}

function updateMenu(state, action){
    const new_state = Object.assign({}, state, {
        menus: action.payload
    });
    for (var i = 0; i < new_state.menus.length; i++){
        for (var j = 0; j < new_state.menus[i].menu_dishes.length; j++){
            new_state.menus[i].menu_dishes[j].order_quantity = 1;
        }
    }
    return new_state;
}

function __setOrderQuantity(state, menu_index, dish_index, quantity) {
    const new_state = update(state, {
        menus: {
            [menu_index]: {
                menu_dishes: {
                    [dish_index]: {
                        order_quantity: {
                            $set: quantity
                        }
                    }
                }
            }
        }
    })
    return new_state;

}

function addToCart(state, action){
    let menu_index = action.payload.menu_index;
    let dish_index = action.payload.dish_index;
    const new_state = __setOrderQuantity(state, menu_index, dish_index, 0);
    return new_state;
}

function updateOrderQuantity(state, action){
    var menu_index = action.payload.menu_index;
    var dish_index = action.payload.dish_index;
    const new_state = __setOrderQuantity(state, menu_index, dish_index, action.payload.quantity);
    return new_state;
}

export const restaurantReducers = createReducers(initialState, {
    SET_MANAGER_NAME: setManagerName,
    UPDATE_MENU: updateMenu,
    ADD_TO_CART: addToCart,
    UPDATE_ORDER_QUANTITY: updateOrderQuantity
})

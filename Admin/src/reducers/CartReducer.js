import update from 'update-immutable';
import { createReducers } from '../common/utility'

const initialState = {
    items: {

    },
    total_cart_items: 0
}



function addToCart(state, action, menus) {
    let menu_index = action.payload.menu_index;
    let dish_index = action.payload.dish_index;
    let quantity = menus[menu_index].menu_dishes[dish_index].order_quantity;
    let new_state = update(state, {});
    if (!(menu_index in new_state.items)){
        new_state.items[menu_index] = {}
    }

    if (!(dish_index in new_state.items[menu_index])){
        new_state.items[menu_index][dish_index] = {
            quantity: 0,
            selected: true
        }
    }

    new_state = update(new_state, {
        items: {
            [menu_index]: {
                [dish_index]: {
                    quantity: {
                        $apply: (x) => x + quantity
                    }
                }
            }
        }
    })

    new_state.total_cart_items += quantity;
    return new_state;
}

function updateCartQuantity(state, action){
    const new_state = Object.assign({}, state)
    let menu_index = action.payload.menu_index;
    let dish_index = action.payload.dish_index;
    let prev_quantity = new_state.items[menu_index][dish_index].quantity;
    new_state.items = {
        ...state.items,
        [menu_index]: {
            ...state.items[menu_index],
            [dish_index]: {
                ...state.items[action.payload.menu_index][action.payload.dish_index],
                quantity: action.payload.quantity
            }
        }
    }
    new_state.total_cart_items += action.payload.quantity - prev_quantity;
    return new_state;
}

function selectItemInCart(state, action){
    let menu_index = action.payload.menu_index;
    let dish_index = action.payload.dish_index;
    let new_state = update(state, {
        items: {
            [menu_index]: {
                [dish_index]: {
                    selected: {
                        $set: action.payload.select
                    }
                }
            }
        }
    })
    return new_state;
}

function clearSelectedItemsInCart(state, action) {
    let new_state = {
        items: {

        },
        total_cart_items: 0
    };
    
    for (let menu_index in state.items){
        for (let dish_index in state.items[menu_index]){
            if (!state.items[menu_index][dish_index].selected){
                if (new_state.items[menu_index] === undefined){
                    new_state.items[menu_index] = {}
                }
                new_state.items[menu_index][dish_index] = state.items[menu_index][dish_index];
                new_state.total_cart_items += state.items[menu_index][dish_index].quantity;
            }
        }
    }

    return new_state;
}

export const cartReducers = createReducers(initialState, {
    ADD_TO_CART: addToCart,
    UPDATE_CART_QUANTITY: updateCartQuantity,
    SELECT_ITEM_IN_CART: selectItemInCart,
    CLEAR_SELECTED_ITEMS_IN_CART: clearSelectedItemsInCart
})

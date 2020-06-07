import { merge } from 'lodash';
import { pageReducers } from './PageReducer'
import { cartReducers } from './CartReducer';
import { restaurantReducers } from './RestaurantReducer'
import { endUserReducers } from './EndUserReducer'
import { tokenReducers } from '../reducers/TokenReducer';
import { stateReducers } from './StatusReducer';
import { orderReducers } from '../reducers/OrderReducers'

const initialState = {
    page: undefined,
    tokens: undefined,
    status: undefined,
}

function updateOrderQuantity(new_obj, menu_index, dish_index, quantity){
    new_obj.menus = [...new_obj.menus]
    new_obj.menus[menu_index] = {...new_obj.menus[menu_index]}
    new_obj.menus[menu_index].menu_dishes = [...new_obj.menus[menu_index].menu_dishes]
    new_obj.menus[menu_index].menu_dishes[dish_index] = {
        ...new_obj.menus[menu_index].menu_dishes[dish_index],
        order_quantity: quantity
    }
    return new_obj
}

export function rootReducer(state=initialState, action){
    console.log(action);
    return {
        page: pageReducers(state.page, action),
        tokens: tokenReducers(state.tokens, action),
        status: stateReducers(state.status, action),
    }
}

function someReducer(state=initialState, action){
    switch (action.type){
        case 'UPDATE_MENU':
            var new_obj = Object.assign({}, state, {
                menus: action.payload
            });
            for (var i = 0; i < new_obj.menus.length; i++){
                for (var j = 0; j < new_obj.menus[i].menu_dishes.length; j++){
                    new_obj.menus[i].menu_dishes[j].order_quantity = 1;
                }
            }
            return new_obj;
        case 'SELECT_TAB':
            return Object.assign({}, state, {
                current_tab: action.payload
            })
        case 'UPDATE_ORDER_QUANTITY':
            var menu_index = action.payload.menu_index;
            var dish_index = action.payload.dish_index;
            var new_obj = Object.assign({}, state);
            return updateOrderQuantity(new_obj, menu_index, dish_index, action.payload.quantity);
        case 'ADD_TO_CART':
            
        case 'GO_TO_PAGE':
            var new_obj = Object.assign({}, state)
            new_obj.page_history.push(new_obj.current_page)
            new_obj.current_page = action.payload
            return new_obj
        case 'GO_BACK_PAGE':
            var new_obj = Object.assign({}, state)
            new_obj.current_page = new_obj.page_history.pop()
            if (new_obj.current_page === undefined){
                new_obj.current_page = 'MAIN_PAGE';
            }
            return new_obj;
        case 'UPDATE_CART_QUANTITY':
            var new_obj = Object.assign({}, state)
            var menu_index = action.payload.menu_index;
            var dish_index = action.payload.dish_index;
            var prev_quantity = new_obj.cart[menu_index][dish_index].quantity;
            new_obj.cart = {
                ...state.cart,
                [menu_index]: {
                    ...state.cart[menu_index],
                    [dish_index]: {
                        ...state.cart[action.payload.menu_index][action.payload.dish_index],
                        quantity: action.payload.quantity
                    }
                }
            }
            new_obj.total_cart_items += action.payload.quantity - prev_quantity;
            return new_obj;
        case 'SELECT_ITEM_IN_CART':
            var new_obj = {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload.menu_index]: {
                        ...state.cart[action.payload.menu_index],
                        [action.payload.dish_index]: {
                            ...state.cart[action.payload.menu_index][action.payload.dish_index],
                            selected: action.payload.select
                        }
                    }
                }
            }
            return new_obj;
        case 'SET_MANAGER_NAME':
            var new_obj = {
                ...state,
                manager_name: action.payload
            }
            return new_obj;
        case 'SUBMITTING_ORDER':
            var new_obj = {
                ...state,
                submitting_order: action.payload
            }
            return new_obj;
        default:
            return state;
    }
}

export default rootReducer;
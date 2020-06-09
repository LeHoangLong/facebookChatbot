import axios from 'axios';
import { clearSelectedItemsInCart } from '../actions/cart'
export { setToken as setToken, setTokenExpiry as setTokenExpiry, getCsrfToken as getCsrfToken } from './token';
export { getOrders as getOrders, setCurrentOrderPageNumber as setCurrentOrderPageNumber } from '../actions/order';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function menuFetchPending(){
    return {
        type: 'MENU_PENDING'
    }
};

export function updateOrderQuantity(menu_index, dish_index, quantity) {
    return {
        type: 'UPDATE_ORDER_QUANTITY',
        payload: {
            menu_index: menu_index,
            dish_index: dish_index,
            quantity: quantity
        }
    }
}

export function addToCart(menu_index, dish_index, quantity){
    return {
        type: 'ADD_TO_CART',
        payload: {
            menu_index: menu_index,
            dish_index: dish_index
        }
    }
}

export const selectItemInCart = (menu_index, dish_index, select) => ({
    type: 'SELECT_ITEM_IN_CART',
    payload: {
        menu_index: menu_index,
        dish_index: dish_index,
        select: select
    }
})

export function goToPage(page_name) {
    return {
        type: 'GO_TO_PAGE',
        payload: page_name
    }
}

export const goBackPage = () => ({
    type: 'GO_BACK_PAGE'
});

export const updateCartQuantity = (menu_index, dish_index, quantity) => ({
    type: 'UPDATE_CART_QUANTITY',
    payload: {
        menu_index: menu_index,
        dish_index: dish_index,
        quantity: quantity
    }
})

export const menuUpdate = (menu) => ({
    type: 'UPDATE_MENU',
    payload: menu
});

export const navigationBarSetTab = (tab_index) => ({
    type: 'SELECT_TAB',
    payload: tab_index
});

export const setManagerName = (manager_name) => ({
    type: 'SET_MANAGER_NAME',
    payload: manager_name
})

export function getMenu(manager_name) {
    return dispatch => {
        dispatch(menuFetchPending());
        axios.get('/enduser/get_menu?manager_name=' + manager_name).then(res => {
            dispatch(menuUpdate(res.data['menu_set']));
        });
    }
}

export const orderPending = (pending) => ({
    type: 'SUBMITTING_ORDER',
    payload: pending
})

const createOrder = (restaurant_id, floor_id, table_id, restaurant, cart_items, token) => {
    let data = {
        manager_name: restaurant.manager_name,
        restaurant: restaurant_id,
        floor: floor_id,
        table: table_id, 
        order_items: []
    }
    
    for (let menu_index in cart_items){
        for (let dish_index in cart_items[menu_index]){
            if (cart_items[menu_index][dish_index].selected === true){
                let order_item = {
                    dish: restaurant.menus[menu_index].menu_dishes[dish_index].id,
                    menu: restaurant.menus[menu_index].id,
                    quantity: cart_items[menu_index][dish_index].quantity
                }
                data.order_items.push(order_item);
            }
        }
    }

    return new Promise((resolve, reject) => {
        axios.post('/enduser/api/order/', data, {
            headers: {
                Authorization: 'Token ' + token
            }
        }).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}

export function submitOrder(restaurant_id, floor_id, table_id, restaurant, cart_items, token){ 
    return dispatch => {
        dispatch(orderPending(true))
        createOrder(restaurant_id, floor_id, table_id, restaurant, cart_items, token).then(res => {
            console.log(res);
            if (res.data.status === 'OK'){
                dispatch(clearSelectedItemsInCart());
                dispatch(goToPage('ORDER_SUCCESS_PAGE'));
            }else{

            }
        }).finally(() => {
            dispatch(orderPending(false));
        });
    }
}

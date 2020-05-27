import Axios from "axios"
import { Status, setStatus } from '../actions/status'

export const setOrders = (orders) => ({
    type: 'SET_ORDERS',
    payload: orders
})

export const setCurrentOrderPageNumber = (pageNumber) => ({
    type: 'SET_CURRENT_ORDER_PAGE_NUMBER',
    payload: pageNumber
})

export const setNumberOfCurrentOrderPages = (numOfPages) => ({
    type: 'SET_NUMBER_OF_CURRENT_ORDER_PAGES',
    payload: numOfPages
})

export const getOrders = (token, pageNumber=1) => {
    return dispatch => {
        dispatch(setStatus('ORDER', Status.FETCHING));
        dispatch(setCurrentOrderPageNumber(pageNumber));
        Axios.get('/enduser/api/order', {
            headers: {
                Authorization: 'Token ' + token
            },
            params: {
                page: pageNumber
            }
        }).then(res => {
            dispatch(setOrders(res.data.results));
            let page_size = res.data.results.length;
            let num_of_pages = Math.ceil(res.data.count / page_size);
            dispatch(setNumberOfCurrentOrderPages(num_of_pages));
        }).then(() => {
            dispatch(setStatus('ORDER', Status.IDLE));
        })
    }  
}

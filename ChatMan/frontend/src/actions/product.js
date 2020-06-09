import Axios from "axios";
import { BACKEND_URL } from '../common/config';
import { setStatus, Status } from './status';

export const checkIfLoggedIn = () => {
    return dispatch => {
        Axios.get(`${BACKEND_URL}/check_login`).then(res => {
            dispatch(setStatus('LOGIN_STATUS', Status.SUCCESS, ''));
        }).catch(err => {
            let res = err.response;
            if (res.status === 403 || res.status === 400 || res.status === 500){
                //forbidden
                dispatch(setStatus('LOGIN_STATUS', Status.ERROR, res.data));
            }
        })
    }
}

export const createProduct = (data) => {
    return dispatch => {
        dispatch(setStatus('PRODUCT_CREATE_STATUS', Status.FETCHING));
        Axios.post(`${BACKEND_URL}/product`, {
            number: data.number,
            name: data.name,
            price: data.price,
            currency: data.currency,
            description: data.description,
            additionalInfo: data.additionalInfo
        }).then(res => {
            dispatch(setStatus('PRODUCT_CREATE_STATUS', Status.SUCCESS));
            dispatch(setStatus('PRODUCT_CREATE_STATUS', Status.IDLE));
        }).catch(err => {
            console.log(err.response);
            if (err.response.status === 400 || err.response.status === 403){
                dispatch(setStatus('PRODUCT_CREATE_STATUS', Status.ERROR, err.response.data));
            }else if (err.response.status === 500){
                dispatch(setStatus('PRODUCT_CREATE_STATUS', Status.ERROR, 'SERVER_ERROR'));
            }
        })
    }
}
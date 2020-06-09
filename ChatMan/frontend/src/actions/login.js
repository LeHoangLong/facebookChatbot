import Axios from "axios";
import { setStatus, Status } from './status';
import { BACKEND_URL } from '../common/config';

export const checkIfLoggedIn = () => {
    return dispatch => {
        Axios.get(`${BACKEND_URL}/check_login`).then(res => {
            dispatch(setStatus('LOGIN_STATUS', Status.SUCCESS, ''));
        }).catch(err => {
            console.log('err');
            console.log(err);
            let res = err.response;
            if (res.status === 403 || res.status === 400 || res.status === 500){
                //forbidden
                dispatch(setStatus('LOGIN_STATUS', Status.ERROR, res.data));
            }
        })
    }
}

export const logIn = (facebook_token) => {
    return dispatch => {
        Axios.post(`${BACKEND_URL}/facebook_login_token`, {
            'token': facebook_token,
        }).then(res => {
            dispatch(setStatus('LOGIN_STATUS', Status.SUCCESS, ''))
        })
    }
}

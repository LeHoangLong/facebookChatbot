import Axios from "axios";
import { BACKEND_URL } from '../common/config';
import { setStatus, Status } from './status';

export const checkIfLoggedIn = () => {
    return dispatch => {
        console.log('checking login');
        Axios.get(`${BACKEND_URL}/check_login`).then(res => {
            dispatch(setStatus('LOGIN_STATUS', Status.SUCCESS, ''));
        }).catch(err => {
            let res = err.response;
            if (res.status === 403 || res.status === 400){
                //forbidden
                dispatch(setStatus('LOGIN_STATUS', Status.ERROR, res.data));
            }
        })
    }
}
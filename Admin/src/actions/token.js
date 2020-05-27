import { BACKEND_URL } from '../common/config'
import axios from 'axios';

export const setToken = (name, value) => ({
    type: 'SET_TOKEN',
    payload: {
        name: name,
        value: value
    }
})
export const setTokenExpiry = (name, value) => ({
    type: 'SET_TOKEN_EXPIRY',
    payload: {
        name: name,
        value: value
    }
})

export const getCsrfToken = () => {
    return dispatch => {
        axios.get(`${BACKEND_URL}/csrftoken`).then(res => {
            let csrftoken = res.data._csrf;
            dispatch(setToken('CSRF_TOKEN', csrftoken));
            dispatch(setTokenExpiry('CSRF_TOKEN', 'never'));
            axios.defaults.headers.post['X-CSRF-Token'] = csrftoken;
        })
    }
}


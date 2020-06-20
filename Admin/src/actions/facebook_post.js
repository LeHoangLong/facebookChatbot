import Axios from "axios";
import { BACKEND_URL } from '../common/config';
import { setStatus, Status } from './status';

export const updatePost = data => {
    return dispatch => {
        dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.FETCHING));
        Axios.patch(`${BACKEND_URL}/productpost/${data.id}`, {
            content: data.content,
            product_references: data.product_references,
        }).then(res => {
            console.log('res');
            console.log(res);
            dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.SUCCESS));
            dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.IDLE));
        }).catch(err => {
            console.log(err);
            if (err.response.status === 400 || err.response.status === 403){
                dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.ERROR, err.response.data));
            }else if (err.response.status === 500){
                dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.ERROR, 'SERVER_ERROR'));
            }
        })
    }
}
export const createPost = (data) => {
    return dispatch => {
        dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.FETCHING));
        Axios.post(`${BACKEND_URL}/facebookpost`, {
            content: data.content,
            product_references: data.product_references,
        }).then(res => {
            console.log('res');
            console.log(res);
            dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.SUCCESS));
            dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.IDLE));
        }).catch(err => {
            console.log(err.response);
            if (err.response.status === 400 || err.response.status === 403){
                dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.ERROR, err.response.data));
            }else if (err.response.status === 500){
                dispatch(setStatus('FACEBOOK_POST_CREATE_STATUS', Status.ERROR, 'SERVER_ERROR'));
            }
        })
    }
}

export const setPost = posts => ({
    type: 'SET_POSTS',
    payload: posts
})

export const getPosts = (refresh) => {
    return dispatch => {
        console.log('getting post');
        Axios.get(`${BACKEND_URL}/facebookpost?refresh=${refresh}`).then(res => {
            let posts = res.data.sort((a,b) => -(a.createdAt - b.createdAt));
            dispatch(setPost(posts));
        }).catch(err => {
            console.log('err');
            console.log(err);
        })
    }
}

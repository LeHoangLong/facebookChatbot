import moment from 'moment';
import { BACKEND_URL } from './config'

export function createReducers(initialState, handlers) {
    return function reducers(state=initialState, action, arg1){
        if (action.type in handlers){
            return handlers[action.type](state, action, arg1)
        }else{
            return state;
        }
    }
}

export const facebookInit = (cb) => {
    window.fbAsyncInit = function() {
        window.FB.init({
            appId            : '1388493331337189',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v7.0'
        })
        cb();
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export const facebookLogin = () => {
    return new Promise((resolve, reject) => {
        window.FB.login(function(response) {
            console.log('response');
            console.log(response);
            if (response.authResponse) {
                resolve(response.authResponse);
            } else {
                reject(response);
            }
        }, {
            scope: 'email', 
            return_scopes: true
        })
    });
}

export const isTokenValid = (tokens, token_name) => {
    if (token_name in tokens){
        if (tokens[token_name].value !== undefined && tokens[token_name].expiry !== undefined){
            if (tokens[token_name].expiry === 'never'){
                return true;
            }
            let current_time = Math.floor(Date.now() / 1000);
            let expiry_date = moment(tokens[token_name].expiry).unix();
            if (current_time < expiry_date){
                return true
            }
        }
    }
    return false;
}

export const getTokenvalue = (tokens, token_name) => tokens[token_name].value;

export const getDish = (menus, menu_id, dish_id) => {
    for (let i = 0; i < menus.length; i++){
        if (menus[i].id === menu_id){
            for (let j = 0; j < menus[i].menu_dishes.length; j++){
                if (menus[i].menu_dishes[j].id === dish_id){
                    return menus[i].menu_dishes[j];
                }
            }
            break;
        }
    }
    return undefined;
}

export const compareIsoTimeString = (time_1, time_2) => {
    time_1 = new Date(time_1);
    time_2 = new Date(time_2);
    let ret = time_1 - time_2;
    return ret;
}

export const getStatus = (statuses, status_name) => {
    if (statuses === undefined || !(status_name in statuses)){
        return undefined;
    }
    return statuses[status_name];
}

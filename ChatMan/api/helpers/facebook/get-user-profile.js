const axios = require('axios');

const getAppAccessToken = (app_id, app_secret) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${app_id}&client_secret=${app_secret}&grant_type=client_credentials`).then(res => {
      resolve(res.data['access_token']);  
    }).catch(err => {
      console.log('err 1');
      console.log(err);
    })
  })
}

const verifyUserAccessToken = (user_token, app_token) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://graph.facebook.com/v7.0/debug_token?input_token=${user_token}&access_token=${app_token}`).then(res => {
      res = res.data;
      if (res !== undefined && res.data !== undefined && res.data.is_valid){
        resolve(true);
      }else{
        resolve(false);
      }
    }).catch(err =>{
      console.log('err 2');
      console.log(err);
      reject(err)
    })
  })
}

const getUserProfile = (user_token) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://graph.facebook.com/v7.0/me/?access_token=${user_token}&fields=email,name`).then(res => {
      res = res.data;
      if ('email' in res){
        let profile = {
          'email': res['email']
        }
        if ('name' in res){
          profile['name'] = res['name'];
        }else{
          profile['name'] = '';
        }
        resolve(profile);
      }else{
        reject('MissingEmail');
      }
    }).catch(err => {
      console.log('err 3');
      console.log(err);
      reject(err);
    })
  })
}

var app_access_token;

module.exports = {

  friendlyName: 'Get user profile',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true,
      description: 'User access token obtained from facebook'
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'User profile',
    }
  },


  fn: async function (inputs) {

    if (app_access_token === undefined){
      app_access_token = await getAppAccessToken(sails.config.token.FACEBOOK_CLIENT_ID, sails.config.token.FACEBOOK_APP_SECRET)
    }
    
    let user_token = inputs.token;
    let is_token_valid = await verifyUserAccessToken(user_token, app_access_token);
    if (is_token_valid){
        let profile = await getUserProfile(user_token);
        return profile;
    }else{
      throw 'InvalidToken'
    }
    // All done.
  }


};


const axios = require('axios');

module.exports = {
  friendlyName: 'Subscribe to node',


  description: '',


  inputs: {
    object_type: {
      type: 'string',
      required: true,
      isIn: ['user', 'page', 'permissions', 'payments']
    },
    callback_url: {
      type: 'string',
      required: true
    },
    fields: {
      type: 'ref',
      required: true,
      description: 'List of fields to subscribe to'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let facebook_app_id = sails.config.token.FACEBOOK_CLIENT_ID;
    let verification_token = sails.config.token.FACEBOOK_SUBSCRIPTION_CALLBACK_VERIFICATION_TOKEN;
    let app_id = sails.config.token.FACEBOOK_CLIENT_ID;
    let app_secret = sails.config.token.FACEBOOK_APP_SECRET;
    let app_access_token = await sails.helpers.facebook.getAppAccessToken.with({ app_id:app_id, app_secret:app_secret });
    console.log('app_access_token');
    console.log(app_access_token);
    let url = `https://graph.facebook.com/${facebook_app_id}/subscriptions?access_token=${app_access_token}`;
    return await axios.post(url, {
      object: inputs.object_type,
      callback_url: inputs.callback_url,
      verify_token: verification_token,
      fields: inputs.fields
    }).then(res => {
      console.log(res.data);
      return res.data.success;
    }).catch(err =>{
      console.log(err.response.data);
      return false;
    })
  }


};


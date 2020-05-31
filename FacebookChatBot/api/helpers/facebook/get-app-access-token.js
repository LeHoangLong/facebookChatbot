const axios = require('axios');

module.exports = {

  friendlyName: 'Get app access token',


  description: '',


  inputs: {
    app_id: {
      type: 'string',
      required: true
    },
    app_secret: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'App access token',
    },

  },


  fn: async function (inputs) {
    return await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${inputs.app_id}&client_secret=${inputs.app_secret}&grant_type=client_credentials`).then(res => {
      return res.data['access_token'];  
    }).catch(err => {
      console.log('err 1');
      console.log(err);
      return null;
    })

  }


};


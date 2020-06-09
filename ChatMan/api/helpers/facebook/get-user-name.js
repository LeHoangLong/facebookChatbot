const axios = require('axios');

module.exports = {

  friendlyName: 'Get user name',


  description: '',


  inputs: {
    psid: {
      type: 'string',
      required: true,
      description: 'Facebook Page-scoped ID'
    },
    token: {
      type: 'string',
      required: true,
      description: 'Page access token'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'User name',
    },

  },


  fn: async function (inputs) {
    let psid = inputs.psid;
    let token = inputs.token;
    // Get user name.
    return axios.get(`https://graph.facebook.com/v7.0/${psid}?fields=name&access_token=${token}`).then(res =>{
      if ('name' in res.data){
        return res.data.name;
      }else{
        return null;
      }
    }).catch(err => {
      console.log('facebook get user name error');
      console.log(err.response);
      return null;
    })

  }


};


const axios = require('axios');

module.exports = {


  friendlyName: 'Get recent posts',


  description: '',


  inputs: {
    page_id: {
      type: 'string',
      required: true
    },
    page_access_token: {
      type: 'string',
      required: false,
      defaultsTo: sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Recent posts',
    },

  },


  fn: async function (inputs) {

    // Get recent posts.
    let page_id = inputs.page_id;
    let page_access_token = inputs.page_access_token;
    var recentPosts = await axios.get(`https://graph.facebook.com/v7.0/${page_id}/posts?access_token=${page_access_token}`).then(res => {
      return res.data.data;
    }).catch(err => {
      console.log('err');
      console.log(err.response);
      return []
    })
    // TODO

    // Send back the result through the success exit.
    return recentPosts;

  }


};


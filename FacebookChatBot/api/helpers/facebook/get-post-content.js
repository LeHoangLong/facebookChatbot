const axios = require('axios');

module.exports = {


  friendlyName: 'Get post content',


  description: '',


  inputs: {
    post_id: {
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
      outputFriendlyName: 'Post content',
    },

  },


  fn: async function (inputs) {

    // Get post content.
    var postContent;
    // TODO
    let post_id = inputs.post_id;
    let page_access_token = inputs.page_access_token;
    return await axios.get(`https://graph.facebook.com/v7.0/${post_id}?access_token=${page_access_token}`).then(res => {
      return res.data;
    }).catch(err => {
      console.log('err');
      console.log(err.response);
      return undefined;
    })

    // Send back the result through the success exit.
    return postContent;

  }


};


const { default: Axios } = require("axios");

module.exports = {


  friendlyName: 'Get post comments',


  description: '',


  inputs: {
    post_id: {
      type: 'string',
      required: true
    },
    access_token: {
      type: 'string',
      required: false,
      defaultsTo: sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Post comments',
    },

  },


  fn: async function (inputs) {
    let post_id = inputs.post_id;
    let access_token = inputs.access_token;
    // Get post comments.
    var postComments = [];
    // TODO
    await Axios.get(`https://graph.facebook.com/v7.0/${post_id}/comments?access_token=${access_token}`).then(res => {
      if ('data' in res.data){
        postComments = res.data.data;
      }
    }).catch(err => {
      console.log('err');
      console.log(err.response.data);
    })

    // Send back the result through the success exit.
    return postComments;

  }


};


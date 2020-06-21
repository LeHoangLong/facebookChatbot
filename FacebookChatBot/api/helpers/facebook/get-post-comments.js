const { default: Axios } = require("axios");

async function getComments(url){
  let postComments = await Axios.get(url).then(async res => {
    let postComments = [];
    if ('data' in res.data){
      postComments = res.data.data;
      if ('paging' in res.data){
        if ('next' in res.data.paging && res.data.paging.next.length > 0){
          await getComments(res.data.paging.next).then(res => {
            postComments = postComments.concat(res);
          })
        }
      }
    }
    return postComments;
  }).catch(err => {
    console.log('err');
    console.log(err.response.data);
    return [];
  })
  
  return postComments;
}

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
    postComments = await getComments(`https://graph.facebook.com/v7.0/${post_id}/comments?access_token=${access_token}`);
    // Send back the result through the success exit.
    return postComments;

  }
};


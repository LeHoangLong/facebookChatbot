const axios = require('axios');

module.exports = {
  friendlyName: 'Post to page',


  description: '',


  inputs: {
    content: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let content = inputs.content;
    return await axios.post(`https://graph.facebook.com/v7.0/${sails.config.token.FACEBOOK_PAGE_ID}/feed?access_token=${sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN}`, {
      message: content
    }).then(res => {
      console.log('res.data');
      console.log(res.data);
      return res.data.id;
    }).catch(err => {
      console.log(err);
      return null;
    })
  }


};


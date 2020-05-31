
const axios = require('axios');

module.exports = {

  friendlyName: 'Reply to user',


  description: '',


  inputs: {
    reply: {
      type: 'ref',
      required: true
    },
    recipient: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let recipient = inputs.recipient;
    let reply = inputs.reply;
    const FACEBOOK_PAGE_ID = sails.config.token.FACEBOOK_PAGE_ID;
    const FACEBOOK_PAGE_ACCESS_TOKEN = sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN;
    return axios.post(`https://graph.facebook.com/v7.0/${FACEBOOK_PAGE_ID}/messages?access_token=${FACEBOOK_PAGE_ACCESS_TOKEN}`, {
      messaging_type: "RESPONSE",
      recipient: {
          ...recipient
      },
      message: {
          ...reply
      }
    })
  }
};


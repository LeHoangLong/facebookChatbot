
const axios = require('axios');
const FB_PAGE_ID = "107415187654620";
const FB_PAGE_ACCESS_TOKEN = "EAADbVcmRRsEBAO8v4aMpEsRSCivTdaLHZAZBTdC6TqEeIR9se3DZBTV2bZBhIZBclgoT6dNwNdSmKksYeJo6JBaHcrhAWw9Vy0ZAHZAtgK3Cvmmhl0eLJ79wG2PfpwIDWZB1dk7DXv0AGUS15o8PcGLRhwUuvBJRJm9kCR7ZAKU3aJYaYlDhXZCmJox8ws7oyez90ZD";


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
    return axios.post(`https://graph.facebook.com/v7.0/${FB_PAGE_ID}/messages?access_token=${FB_PAGE_ACCESS_TOKEN}`, {
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


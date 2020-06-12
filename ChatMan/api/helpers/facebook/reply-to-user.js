
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
    },
    quick_replies: {
      type: 'ref',
      required: false,
      defaultsTo: []
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

    let reply_message = {
      ...reply
    }

    if (inputs.quick_replies.length > 0){
      let quick_replies = [];
      for (let i = 0; i < inputs.quick_replies.length; i++){
        if ("type" in inputs.quick_replies[i] && "text" in inputs.quick_replies[i] && "callback_text" in inputs.quick_replies[i]){
          quick_replies.push({
            content_type: inputs.quick_replies[i].type,
            title: inputs.quick_replies[i].text,
            payload: inputs.quick_replies[i].callback_text
          })
        }else{
          throw 'INVALID_QUICK_REPLY_FORMAT';
        }
      }
      
      reply_message.quick_replies = quick_replies;
    }

    return axios.post(`https://graph.facebook.com/v7.0/${FACEBOOK_PAGE_ID}/messages?access_token=${FACEBOOK_PAGE_ACCESS_TOKEN}`, {
      messaging_type: "RESPONSE",
      recipient: {
          ...recipient
      },
      message: reply_message
    }).catch(err => {
      console.log(err.response);
    })
  }
};


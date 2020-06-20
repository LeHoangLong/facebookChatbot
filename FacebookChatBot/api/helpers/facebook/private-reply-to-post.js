module.exports = {


  friendlyName: 'Private reply to post',


  description: '',


  inputs: {
    recipient: {
      type: 'ref',
      required: true
    },
    message: {
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
    // TODO
    let recipient = inputs.recipient;
    let reply = inputs.reply;
    const FACEBOOK_PAGE_ID = sails.config.token.FACEBOOK_PAGE_ID;
    const FACEBOOK_PAGE_ACCESS_TOKEN = sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN;

    let reply_message = {
      ...reply
    }

    console.log('recipient');
    console.log(recipient);
    console.log('reply_message');
    console.log(reply_message);

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


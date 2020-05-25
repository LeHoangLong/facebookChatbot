module.exports = {


  friendlyName: 'Message handler',


  description: '',


  inputs: {
    event: {
      type: 'ref',
      description: 'event object from facebook',
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
    let message = inputs.event;
    let content = message['message'];
    let sender = message['sender'];
    let received_text = content.text;
    let response = await sails.helpers.facebook.getWitMessage.with({message: received_text});
    let data = response.data;
    //await sails.helpers.facebook.replyToUser.with({recipient: sender, reply: {'text': 'Hello'}})
    await sails.helpers.facebook.handleIntent(data, sender);
  }


};


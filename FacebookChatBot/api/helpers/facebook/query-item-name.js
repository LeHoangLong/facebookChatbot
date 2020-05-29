module.exports = {


  friendlyName: 'Query item name',


  description: '',


  inputs: {
    data: {
      type: 'ref',
      required: true
    },
    sender: {
      type: 'ref',
      required: true
    },
    context: {
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
    let data = inputs.data;
    let sender = inputs.sender;
    let context = inputs.context;
    let sender_id = sender['sender_id'];
    await UserContext.update({uid: sender_id}).set({context: {...context, state: 'QUERYING_ITEM_NAME', state_timestamp: Date.now(), snapshot: {
      sender: sender,
      context: context,
      data: data
    }}});
    let reply = {};
    reply['text'] = `Sorry, which item are you referring to?`;
    await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
  }


};


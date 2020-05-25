module.exports = {


  friendlyName: 'Greeting handler',


  description: '',


  inputs: {
    data: {
      type: 'ref',
      required: false
    },
    sender: {
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
    let reply = {
      'text': 'Hi, How may i help you?'
    }
    let sender = inputs.sender;
    await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
  }


};


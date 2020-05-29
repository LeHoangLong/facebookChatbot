module.exports = {


  friendlyName: 'Handle state',


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
      required: false,
      defaultsTo: {}
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let sender = inputs.sender;
    let data = inputs.data;
    let context = inputs.context;
    let reply = {}; 
    const stateHandlerMap = {
      QUERYING_ITEM_NAME: sails.helpers.facebook.queryItemNameStateHandler,
    };

    if (context['state'] in stateHandlerMap){
      await stateHandlerMap[context['state']].with({data: data, sender: sender, context: context});
    }else{
      reply['text'] = 'Sorry, i am facing some problem. Could you repeat your question?';
      await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
    }
  }


};




module.exports = {
  friendlyName: 'Handle intent',


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
    const intentHandlerMap = {
      greeting: sails.helpers.facebook.greetingHandler,
      query_info: sails.helpers.facebook.queryInfoHandler
    };
    let found = false;
    let sender = inputs.sender;
    let data = inputs.data;
    let context = inputs.context;
    console.log(data);
    for (let i = 0; i < data.intents.length; i++){
        if (data.intents[i].confidence > 0.7){
            found = await intentHandlerMap[data.intents[i].name].with({data: data, sender: sender, context: context});
        }
    }

    if (!found){
        let reply = {
            'text': 'Sorry, i didn\'t get that. Would you mind rephrasing it?'
        }
        await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
    }
  }


};


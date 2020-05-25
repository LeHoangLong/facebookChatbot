

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
      query_item_price: sails.helpers.facebook.queryItemPriceHandler
    };
    let found = false;
    let sender = inputs.sender;
    let data = inputs.data;
    for (let i = 0; i < data.intents.length; i++){
        console.log(data.intents[i]);
        if (data.intents[i].confidence > 0.7){
            found = true;
            await intentHandlerMap[data.intents[i].name].with({data: data, sender: sender});
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


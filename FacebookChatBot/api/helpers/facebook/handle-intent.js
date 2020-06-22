

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
    console.log('context');
    console.log(context);
    for (let i = 0; i < data.intents.length; i++){
        if (data.intents[i].confidence > 0.7){
            found = await intentHandlerMap[data.intents[i].name].with({data: data, sender: sender, context: context});
        }
    }

    if (!found){
      await sails.helpers.facebook.sendErrorToUser.with({ text: "Sorry, i didn't get that. Would you mind rephrasing it?", recipient: sender, context: context});
    }else{
      //get the latest context first before updating, otherwise it will be overwritten
      if ('id' in sender){
	      context = await UserContext.findOne({ uid: sender['id'] });
	      context = context.context;
	      await UserContext.update({ uid: sender['id'] }).set({ context: { ...context, number_of_failure: 0 } });
      }
    }
  }


};


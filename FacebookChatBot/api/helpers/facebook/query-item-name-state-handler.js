const update_fn = require("update-immutable").default;

module.exports = {

  friendlyName: 'Query item name state handler',


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
    let sender_id = sender['id'];
    if (data.text !== undefined){
      let item_name = data.text;
      context = await UserContext.findOne({uid: sender_id});
      if (context !== undefined){
        context = context['context'];
        let snapshot = context.snapshot;
        if (snapshot !== undefined){
          let prev_data = snapshot.data;
          let prev_sender = snapshot.sender;
          let prev_context = snapshot.context;
          if (prev_data && prev_sender && prev_context){
            prev_context['current_item_name'] = item_name;
            //clear the snapshot, state and update context before calling the handle intent.
            await UserContext.update({uid: sender_id}).set({context : {
              ...context,
              current_item_name: item_name,
              snapshot: {},
              state: ''
            }});
            await sails.helpers.facebook.handleIntent.with({ data: prev_data, sender: prev_sender, context: prev_context });
            return;
          }
        }
      }
    }

    //default is error
    reply['text'] = `Sorry, I can only understand text message :(`;
    await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
  }


};


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
    let sender_id = sender['id'];
    let context = await UserContext.findOrCreate({uid: sender_id}, {uid: sender_id, context: { state: 'NONE'}})
    let received_text = content.text;
    let is_message_handled = false;
    if (!(context.context['state'] === undefined || context.context['state'] === '' || context.context['state'] === 'NONE')){
      is_message_handled = await sails.helpers.facebook.handleState.with({ data: content, sender: sender, context: context.context });
    }

    if (!is_message_handled){
      let response = await sails.helpers.facebook.getWitMessage.with({message: received_text});
      let data = response.data;
      await sails.helpers.facebook.handleIntent.with({ data: data, sender: sender, context: context.context });
    }
  }


};


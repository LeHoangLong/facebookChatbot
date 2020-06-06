module.exports = {


  friendlyName: 'Send error to user',


  description: '',


  inputs: {
    text: {
      type: 'string',
      required: true
    },
    recipient: {
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
    let context = inputs.context;
    let recipient = inputs.recipient;
    if (context.number_of_failure === undefined || context.number_of_failure < 2){

      await UserContext.update({ uid: recipient['id'] }).set({ context: { ...context, number_of_failure: context.number_of_failure===undefined? 1 : context.number_of_failure + 1 } });
      
      let reply = {
        'text': 'Sorry, i didn\'t get that. Would you mind rephrasing it?'
      }
      await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: recipient});
    }else{
      
      let reply = {
        'text': "Hmmm, it seems like i am not able to understand your requests. Would you like to talk to my human colleague instead?"
      }
      let quick_replies = [
        {
          type: 'text',
          text: 'Yes',
          callback_text: 'YES'
        },
        {
          type: 'text',
          text: 'No',
          callback_text: 'NO'
        },
      ]
      await UserContext.update({ uid: recipient['id'] }).set({ context: { ...context, number_of_failure: 0, state: 'CHECK_IF_USER_WANT_TO_SPEAK_TO_HUMAN' } });
      await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: recipient, quick_replies: quick_replies});
    }
  }


};


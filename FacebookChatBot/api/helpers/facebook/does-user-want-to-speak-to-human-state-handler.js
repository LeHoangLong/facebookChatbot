module.exports = {


  friendlyName: 'Does user want to speak to human state handler',


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

    if (data.text.toUpperCase() === 'YES'){
      //user wants to speak to human.
      let pass_thread_control_success = await sails.helpers.facebook.passThreadControl.with({recipient: sender, target_app_id: sails.config.token.SECONDARY_APP_ID, page_access_token: sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN});
      if (pass_thread_control_success){
        reply = {
          text: 'I have informed my colleagues. They will contact you as soon as possible.'
        }    
      }else{
        reply = {
          text: 'Hmm, seems like my colleagues are not available. Would you like to give me another chance?'
        }
      }
      await UserContext.update({ uid: sender['id'] }).set({ context: { ...context, state : '', number_of_failure: 0 } });
      await sails.helpers.facebook.replyToUser.with({ reply: reply, recipient: sender})
      return true;
    }else if (data.text.toUpperCase() === 'NO'){
      //user wants to continue conversation.
      await UserContext.update({ uid: sender['id'] }).set({ context: { ...context, state : '', number_of_failure: 0 } });
      return true;
    }else{
      return false;
    }
  }


};


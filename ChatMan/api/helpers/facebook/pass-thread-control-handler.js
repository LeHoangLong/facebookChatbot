module.exports = {


  friendlyName: 'Pass thread control handler',


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
    let event = inputs.event;
    let pass_thread_control = event.pass_thread_control;
    console.log('pass_thread_control_handler');
    console.log(event);
    console.log(pass_thread_control);
    console.log(typeof(pass_thread_control));
    if ('new_owner_app_id' in pass_thread_control){
      let owner_app_id = pass_thread_control.new_owner_app_id;
      console.log('owner_app_id');
      console.log(owner_app_id);
      console.log(typeof(owner_app_id));
      console.log('sails.config.token.FACEBOOK_CLIENT_ID');
      console.log(sails.config.token.FACEBOOK_CLIENT_ID);
      console.log(typeof(sails.config.token.FACEBOOK_CLIENT_ID));
      if (owner_app_id == sails.config.token.FACEBOOK_CLIENT_ID){
        //we are now handling the conversation, so create a pending conversation
        let sender = event['sender'];
        let sender_id = sender['id'];
        console.log('sender_id');
        console.log(sender_id);
        await sails.helpers.findOrCreateConversationForFacebookUser.with({ user_id: sender_id });
      }
    }
  }


};


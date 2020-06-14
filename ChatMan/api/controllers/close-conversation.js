module.exports = {


  friendlyName: 'Close conversation',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let conversation_id = this.req.body.conversation_id;
    if (conversation_id){
      let pass_thread_control_success = false;
      
      if (sails.config.token.SECONDARY_APP_ID){
        let conversation_participants = await sails.models['conversation_participants__messageauthor_conversations'].find({ conversation_participants: conversation_id });
        
        console.log('conversation_participants');
        console.log(conversation_participants);

        for (let i = 0; i < conversation_participants.length; i++){
          let facebook_user = await FacebookUser.findOne({ message_author: conversation_participants[i].messageauthor_conversations });
          console.log('facebook_user');
          console.log(facebook_user);
          if (facebook_user){
            //if is facebook user, pass thread control
            let recipient = {
              id: facebook_user.user_id
            }
            console.log('recipient');
            console.log(recipient);
            pass_thread_control_success = await sails.helpers.facebook.passThreadControl.with({ recipient: recipient, target_app_id: sails.config.token.SECONDARY_APP_ID, page_access_token: sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN});
            console.log('pass_thread_control_success 1');
            console.log(pass_thread_control_success);
          }
        }
      }else{
        pass_thread_control_success = true;
      }

      console.log('pass_thread_control_success');
      console.log(pass_thread_control_success);
      
      if (pass_thread_control_success){
        let token = this.req.signedCookies.token;
        let user = await sails.helpers.getUserFromToken(token);
        await MessageAuthor.removeFromCollection(user.message_author, 'conversations').members([
          conversation_id
        ]);
        return 'OK';
      }else{
        return this.res.status(500).send('COULD_NOT_PASS_THREAD_TO_PRIMARY_APP');
      }
    }else{
      return this.res.status(400).send('MISSING_CONVERSATION_ID_PARAMETER');
    }
  }


};

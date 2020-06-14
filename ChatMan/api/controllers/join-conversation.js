module.exports = {


  friendlyName: 'Join conversation',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let conversation_id = this.req.body.conversation_id;
    let token = this.req.signedCookies.token;
    let user = await sails.helpers.getUserFromToken(token);
    let conversation = await Conversation.findOne({ id: conversation_id });
    let pending_conversations = (await JsonDocument.findOne({ name: 'PENDING_CONVERSATIONS' })).data;
    let ret = {
      status: 'OK'
    };

    if (pending_conversations.includes(conversation_id)){
      if (conversation){
        await MessageAuthor.addToCollection( user.message_author, 'conversations').members([conversation_id]);
        let index = pending_conversations.indexOf(conversation_id);
        pending_conversations.splice(index, 1);
        await JsonDocument.update({ name: 'PENDING_CONVERSATIONS' }).set({
          data: pending_conversations
        });
        ret = {
          status: 'OK'
        }        
      }else{
        ret = {
          status: 'ERROR',
          detail: 'CONVERSATION_NOT_FOUND'
        }
      }
    }else{
      ret = {
        'status': 'ERROR',
        'detail': 'CONVERSATION_IS_BEING_HANDLED'
      }
    }

    return this.res.json(ret);
  }


};

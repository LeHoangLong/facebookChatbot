module.exports = {


  friendlyName: 'Get conversation',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    //get user conversation
    let conversations = [];
    let token = this.req.signedCookies.token;
    let user = await sails.helpers.getUserFromToken(token);

    let conversation_author = await sails.models['conversation_participants__messageauthor_conversations'].find({ messageauthor_conversations: user.message_author });
 
    for (let i = 0; i < conversation_author.length; i++){
    	let conversation = await Conversation.findOne({ id: conversation_author[i].conversation_participants });
      if (conversation){
	      let latest_message = await sails.helpers.getLatestMessageOfConversation.with({ conversation_id: conversation.id});
        conversation.latest_message = latest_message;
        conversation.is_joint = true;
        conversations.push(conversation);
      }
    }

    return conversations;

  }


};

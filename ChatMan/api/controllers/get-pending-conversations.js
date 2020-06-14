module.exports = {


  friendlyName: 'Get pending conversations',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    let pending_conversations = [];
    let pending_conversations_json = (await JsonDocument.findOne({ name: 'PENDING_CONVERSATIONS'}));
    let pending_conversations_id = []; 
    if (pending_conversations_json){
      pending_conversations_id = pending_conversations_json.data;
    }
    
    for (let i = 0 ; i < pending_conversations_id.length; i++){
      let conversation = await Conversation.findOne({id: pending_conversations_id[i]});
      if (conversation){
	      let latest_message = await sails.helpers.getLatestMessageOfConversation.with({ conversation_id: conversation.id});
        conversation.latest_message = latest_message;
	      conversation.is_joint = false;
        pending_conversations.push(conversation);
      }
    }

    return this.res.status(200).json(pending_conversations);

  }

};

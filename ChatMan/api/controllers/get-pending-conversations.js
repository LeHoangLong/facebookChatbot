
async function getLatestMessage( conversation ){
	let latest_message = await Message.find({ conversation: conversation.id }).sort('createdAt DESC').limit(1);
	latest_message = latest_message[0];
	let author = await MessageAuthor.findOne({ id: latest_message.author });
	latest_message.author_name = await sails.helpers.getMessageAuthorName(author);
	return latest_message;
}

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
	let latest_message = await getLatestMessage(conversation);
        conversation.latest_message = latest_message;
	conversation.is_joint = false;
        pending_conversations.push(conversation);
      }
    }

    //get user conversati
    let token = this.req.signedCookies.token;
    let user = await sails.helpers.getUserFromToken(token);
    let conversation_author = sails.models['conversation_participants__messageauthor_conversations'].find({ messageauthor_conversations: user.message_author });
    for (let i = 0; i < conversation_author.length; i++){
    	let conversation = Conversation.findOne({ id: conversation_author[i].conversation_participants });
	if (conversation){
		let latest_message = await getLatestMessage(conversation);
		conversation.latest_message = latest_message;
		conversation.is_joint = true;
		pending_conversations.push(conversation);
	}
    }
    return this.res.status(200).json(pending_conversations);

  }

};

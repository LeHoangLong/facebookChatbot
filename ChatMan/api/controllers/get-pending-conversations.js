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
    let pending_conversations_id = (await JsonDocument.findOne({ name: 'PENDING_CONVERSATIONS'})).data;
    console.log('pending_conversations_id.length');
    console.log(pending_conversations_id.length);
    for (let i = 0 ; i < pending_conversations_id.length; i++){
      let conversation = await Conversation.findOne({id: pending_conversations_id[i]});
      if (conversation){
        let latest_message = await Message.find({ conversation: conversation.id }).sort('createdAt DESC').limit(1);
        latest_message = latest_message[0];
        console.log(latest_message);
        let author = await MessageAuthor.findOne({ id: latest_message.author });
        latest_message.author_name = await sails.helpers.getMessageAuthorName(author);
        conversation.latest_message = latest_message;
        pending_conversations.push(conversation);
      }
    }
    return this.res.status(200).json(pending_conversations);

  }


};

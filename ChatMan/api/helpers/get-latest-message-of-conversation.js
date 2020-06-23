module.exports = {


  friendlyName: 'Get latest message of conversation',


  description: '',


  inputs: {
    conversation_id: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Latest message of conversation',
    },

  },


  fn: async function (inputs) {

    // Get latest message of conversation.
    let conversation_id = inputs.conversation_id;
    let latest_message = await Message.find({ conversation: conversation_id }).sort('createdAt DESC').limit(1);
    if (latest_message.length > 0){

      latest_message = latest_message[0];
      let author = await MessageAuthor.findOne({ id: latest_message.author });
      latest_message.author_name = await sails.helpers.getMessageAuthorName(author);
      return latest_message;
    }else{
      let author_name = 'Anonymous';
      let conversation_messageauthor = await sails.models['conversation_participants__messageauthor_conversations'].find({ conversation_participants: conversation_id });
      for (let i = 0; i < conversation_messageauthor.length; i++){
        let user = await FacebookUser.findOne({ message_author: conversation_messageauthor[i].messageauthor_conversations });
        if (user){
          author_name = user.name
        }
      }
      console.log('author_name');
      console.log(author_name);
      return {
        author_name: author_name
      }
    }
  

  }


};


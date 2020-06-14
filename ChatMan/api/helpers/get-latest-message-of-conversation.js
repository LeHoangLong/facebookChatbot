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
    latest_message = latest_message[0];
    let author = await MessageAuthor.findOne({ id: latest_message.author });
    latest_message.author_name = await sails.helpers.getMessageAuthorName(author);
    return latest_message;
  

  }


};


module.exports = {


  friendlyName: 'Get messages of conversation',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let token = this.req.signedCookies.token;
    let user = await sails.helpers.getUserFromToken(token);
    let message_author = await MessageAuthor.findOne({ id: user.message_author });
    let conversation_id = this.req.query.conversation_id;
    let messages =  await Message.find({ conversation: conversation_id }).sort('createdAt DESC').limit(50);
    for (let i = 0; i < messages.length; i++){
      if (messages[i].author === message_author.id ){
        messages[i].is_mine = true;
      }else{
        messages[i].is_mine = false;
      }
      let this_message_author = await MessageAuthor.findOne({ id: messages[i].author });
      messages[i].author_name = await sails.helpers.getMessageAuthorName.with({ author: this_message_author });
    }
    // All done.
    return messages;

  }


};

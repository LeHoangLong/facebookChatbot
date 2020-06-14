module.exports = {


  friendlyName: 'Create message',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    let token = this.req.signedCookies.token;
    let user = await sails.helpers.getUserFromToken(token);
    let conversation_id = this.req.body['conversation'];
    let message_content = this.req.body['message'];
    let timestamp = this.req.body['timestamp'];
    await Message.create({
      content: message_content,
      author: user.message_author,
      conversation: conversation_id,
      createdAt: timestamp
    })

    let conversation_participants = await sails.models['conversation_participants__messageauthor_conversations'].find({conversation_participants: conversation_id});
    for (let i = 0; i < conversation_participants.length; i++){
      let participant = await MessageAuthor.findOne({id: conversation_participants[i].messageauthor_conversations});
      let facebook_user = await FacebookUser.findOne({ message_author: participant.id })
      if (facebook_user){
        //reply to user
        let message = {
          text: message_content
        }
        let recipient = {
          id: facebook_user.user_id
        }
        await sails.helpers.facebook.replyToUser.with({ reply: message, recipient: recipient });
      }
    }
    return 'OK';
  }


};

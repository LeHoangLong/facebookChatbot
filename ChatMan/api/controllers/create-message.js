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
    return 'OK';
  }


};

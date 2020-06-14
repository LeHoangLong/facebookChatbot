module.exports = {


  friendlyName: 'Message handler',


  description: '',


  inputs: {
    event: {
      type: 'ref',
      description: 'event object from facebook',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let message = inputs.event;
    let content = message['message'];
    let sender = message['sender'];
    let sender_id = sender['id'];

    let conversation = await sails.helpers.findOrCreateConversationForFacebookUser.with({ user_id: sender_id});
    let facebook_user = await FacebookUser.findOne({user_id: sender_id});

    //create message and put into conversation
    await Message.create({
      content: content.text,
      author: facebook_user.message_author,
      conversation: conversation.id
    })

  }


};


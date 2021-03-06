module.exports = {


  friendlyName: 'Find or create conversation for facebook user',


  description: '',


  inputs: {
    user_id: {
      type: 'string',
      required: true,
      description: 'facebook PSID'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let user_id = inputs.user_id;
    let facebook_user = await FacebookUser.findOne({user_id: user_id});
    sails.log('facebook_user');
    sails.log(facebook_user);
    let message_author;
    if (!facebook_user){
      //if no user, create
      message_author = await MessageAuthor.create({}).fetch();
      //get user name
      let user_name = await sails.helpers.facebook.getUserName.with({ psid: user_id, token: sails.config.token.FACEBOOK_PAGE_ACCESS_TOKEN });

      if (!user_name){
        user_name = user_id;
      }
      facebook_user = await FacebookUser.create({
        user_id: user_id,
        message_author: message_author.id,
        name: user_name
      }).fetch();
      await MessageAuthor.addToCollection(message_author.id, 'facebook_user').members([facebook_user.id])
    }else{
      message_author = await MessageAuthor.findOne({id: facebook_user.message_author});
    }

    let conversations_count = await sails.models['conversation_participants__messageauthor_conversations'].count({ messageauthor_conversations: facebook_user.message_author });

    let conversation;
    if (conversations_count === 0){
      //not in any conversation, so create 1
      conversation = await Conversation.create({}).fetch();
      await MessageAuthor.addToCollection(facebook_user.message_author, 'conversations').members(conversation.id);
      //await Conversation.addToCollection(conversation.id, 'participants').members(facebook_user.message_author);
    }else{
      let res = await sails.models['conversation_participants__messageauthor_conversations'].findOne({ messageauthor_conversations: facebook_user.message_author });
      conversation = await Conversation.findOne({ id : res.conversation_participants });
    }

    //if only 1 participant, put into pending list.
    let participants_count = await sails.models['conversation_participants__messageauthor_conversations'].count({ conversation_participants: conversation.id });

    if (participants_count === 1){
      let pending_conversation_list = await JsonDocument.findOrCreate({ name: 'PENDING_CONVERSATIONS' }, { name: 'PENDING_CONVERSATIONS', data: [] });
      if (!(pending_conversation_list.data.includes(conversation.id))){
        await JsonDocument.update({ id: pending_conversation_list.id }).set({
          data: [
            ...pending_conversation_list.data,
            conversation.id
          ]
        });
      }
    }

    return conversation;
  }


};


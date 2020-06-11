module.exports = {


  friendlyName: 'Get message author name',


  description: '',


  inputs: {
    author: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Message author name',
    },

  },


  fn: async function (inputs) {
    let author = inputs.author;
    // Get message author name.
    var messageAuthorName;
    // TODO
    let facebook_user = await FacebookUser.findOne({ message_author: author.id });
    
    if (facebook_user){
      //if is facebook user
      messageAuthorName = facebook_user.name;  
    }else {
      let receptionist = await User.findOne({ message_author: author.id });
      if (receptionist){
        messageAuthorName = receptionist.fullName;
      }else{
        messageAuthorName = 'Anonymous';
      }
    }

    // Send back the result through the success exit.
    return messageAuthorName;

  }


};


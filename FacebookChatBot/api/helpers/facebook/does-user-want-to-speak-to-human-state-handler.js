module.exports = {


  friendlyName: 'Does user want to speak to human state handler',


  description: '',


  inputs: {
    data: {
      type: 'ref',
      required: true
    },
    sender: {
      type: 'ref',
      required: true
    },
    context: {
      type: 'ref',
      required: false,
      defaultsTo: {}
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let sender = inputs.sender;
    let data = inputs.data;
    let context = inputs.context;

    console.log('data: ');
    console.log(data);
    if (data.text.toUpperCase() === 'YES'){
      //user wants to speak to human.
      reply = {
        text: 'I have informed my colleagues. They will contact you as soon as possible.'
      }    
      await UserContext.update({ uid: sender['id'] }).set({ context: { ...context, state : '', number_of_failure: 0 } });
      await sails.helpers.facebook.replyToUser.with({ reply: reply, recipient: sender})
      return true;
    }else if (data.text.toUpperCase() === 'NO'){
      //user wants to continue conversation.
      await UserContext.update({ uid: sender['id'] }).set({ context: { ...context, state : '', number_of_failure: 0 } });
      return true;
    }else{
      return false;
    }
  }


};


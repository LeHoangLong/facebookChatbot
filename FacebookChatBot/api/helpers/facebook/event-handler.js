

module.exports = {


  friendlyName: 'Event handler',


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


  fn: async function (inputs, exits) {
    let handlersMap = {
      message: sails.helpers.facebook.messageHandler
    };
    let event = inputs.event;
    for (let type in handlersMap){
        if (type in event){
            await handlersMap[type].with({event: event});
        }
    }
  }


};


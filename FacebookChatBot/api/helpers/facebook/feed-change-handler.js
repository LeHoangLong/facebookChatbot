module.exports = {


  friendlyName: 'Feed change handler',


  description: '',


  inputs: {
    change: {
      type: 'ref',
      required: true
    },
    handlersMap: {
      type: 'ref',
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
    let change = inputs.change;
    
    const handlersMap = {
      comment: sails.helpers.facebook.commentItemHandler
    };

    if (change.item in handlersMap){
      await handlersMap[change.item](change);
    }
    
  }


};


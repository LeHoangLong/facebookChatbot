module.exports = {


  friendlyName: 'Feed change handler',


  description: '',


  inputs: {
    change: {
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
    console.log('feed change handler');
    let change = inputs.change;
    
    const handlersMap = {
      comment: sails.helpers.facebook.commentItemHandler
    };

    
    if (change.item in handlersMap){
      console.log('change.item');
      console.log(change.item);
      await handlersMap[change.item](change);
    }
    
  }


};


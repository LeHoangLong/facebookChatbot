module.exports = {


  friendlyName: 'Change handler',


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
    let change = inputs.change;
    
    let handlersMap = {
      feed: sails.helpers.facebook.feedChangeHandler
    };

    if (change.field in handlersMap){
      console.log('change.field');
      console.log(change.field);
      await handlersMap[change.field].with({change: change.value});
    }

  }


};


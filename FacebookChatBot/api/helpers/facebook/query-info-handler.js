module.exports = {


  friendlyName: 'Query info handler',


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
      type: 'json',
      required: false
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let data = inputs.data;
    let sender = inputs.sender;
    let context = inputs.context;
    if (await sails.helpers.facebook.queryItemInfoHandler.with({data: data, sender: sender, context: context})){
      return true;
    }
    return false;

  }


};


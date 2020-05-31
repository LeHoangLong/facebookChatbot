module.exports = {


  friendlyName: 'Subscribe to post comment',


  description: '',


  inputs: {
    callback_url: {
      type: 'string',
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    return await sails.helpers.facebook.subscribeToNode.with({
      object_type: 'page',
      callback_url: inputs.callback_url,
      fields: ['feed']
    });
  }


};


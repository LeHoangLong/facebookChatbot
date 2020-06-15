module.exports = {


  friendlyName: 'Private reply to post',


  description: '',


  inputs: {
    recipient: {
      type: 'ref',
      required: true
    },
    message: {
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
  }


};


module.exports = {


  friendlyName: 'Is admin',


  description: '',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
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
    let req = inputs.req;
    if (req.me !== undefined && req.me.role === 'ADMIN') {
      return true;
    }else{
      return false;
    }
  }


};


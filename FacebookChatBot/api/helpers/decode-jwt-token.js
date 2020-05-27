const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Decode jwt token',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true,
      description: 'jwt token'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let token = inputs.token;
    let secret = inputs.secret === undefined? sails.config.token.JWT_SECRET_KEY : inputs.secret;
    return jwt.verify(token, secret);
  }


};


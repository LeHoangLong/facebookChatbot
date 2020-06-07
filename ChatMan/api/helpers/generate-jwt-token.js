var jwt = require('jsonwebtoken');


module.exports = {


  friendlyName: 'Generate jwt token',


  description: '',


  inputs: {
    data: {
      type: 'ref',
      required: true,
      description: 'data to generate token'
    },
    lifetime: {
      type: 'number',
      required: false,
      description: 'Life time of token, in seconds'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var token;
    if ('lifetime' in inputs){
      token = jwt.sign(inputs.data, sails.config.token.JWT_SECRET_KEY, {
        expiresIn: inputs.lifetime
      })
    }else{
      token = jwt.sign(inputs.data, sails.config.token.JWT_SECRET_KEY)
    }
    return token;
  }


};


module.exports = {


  friendlyName: 'Get user id',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'User id',
    },

  },


  fn: async function (inputs) {
    let token = inputs.token;
    let decoded_token = await sails.helpers.decodeJwtToken(token);
    let uid = decoded_token.uid;
    let user = await User.findOne({ id: uid });

    return user;

  }


};


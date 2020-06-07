module.exports = {


  friendlyName: 'Facebook webhook verify',


  description: 'Handle facebook webhook verification. After the webhook url is set on facebook side, they will\
    send a verification request along with a challenge. The challenge will then be sent back to facebook to complete\
    the verification process',


  inputs: {

  },


  exits: {
    tokenNotMatched: {
      statusCode: 400,
      description: 'verification token did not match'
    }
  },

  fn: async function (inputs) {
    // All done.
    if (this.req.query['hub.verify_token'] === 'token'){
        let challenge = this.req.query['hub.challenge'];
        return challenge
    }else{
      throw 'tokenNotMatched';
    }
  }
};

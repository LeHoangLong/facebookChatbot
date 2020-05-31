module.exports = {


  friendlyName: 'Page event webhook',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    console.log('this.req.query');
    console.log(this.req.query);
    if (this.req.query['hub.verify_token'] === sails.config.token.FACEBOOK_SUBSCRIPTION_CALLBACK_VERIFICATION_TOKEN){
        let challenge = this.req.query['hub.challenge'];
        return challenge
    }else{
      throw 'tokenNotMatched';
    }
    // All done.
    return;

  }


};

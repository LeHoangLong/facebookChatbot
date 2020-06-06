module.exports = {


  friendlyName: 'Webhook verify',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    if (this.req.query['hub.verify_token'] === 'token'){
        let challenge = this.req.query['hub.challenge'];
        return challenge
    }else{
      throw 'tokenNotMatched';
    }
  }


};

module.exports = {


  friendlyName: 'Page event webhook',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    console.log('this.req.body');
    console.log(this.req.body);
    console.log(this.req.body.entry[0].changes);
    // All done.
    return 'OK';

  }


};

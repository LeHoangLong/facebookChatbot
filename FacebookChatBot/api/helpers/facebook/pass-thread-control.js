const axios = require('axios');

module.exports = {

  friendlyName: 'Pass thread control',


  description: '',


  inputs: {
    recipient: {
      type: 'ref',
      required: true
    },
    target_app_id: {
      type: 'string',
      required: true
    },
    page_access_token: {
      type: 'string',
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
    return await axios.post(`https://graph.facebook.com/v7.0/me/pass_thread_control?access_token=${inputs.page_access_token}`, {
      recipient: inputs.recipient,
      target_app_id: inputs.target_app_id
    }).then(res => {
      if ('success' in res.data){
        return res.data['success'];
      }
      return false;
    }).catch(err => {
      console.log('Error in passing thread control');
      console.log(err.response);
      return false;
    })
  }
};


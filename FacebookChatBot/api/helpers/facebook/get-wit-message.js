const axios = require('axios');
const WIT_ACCESS_TOKEN = 'SZSIKYODNJTYWSZAOU3C3YROR6PTH5CM';

module.exports = {
  WIT_ACCESS_TOKEN: WIT_ACCESS_TOKEN,
  friendlyName: 'Get wit message',


  description: 'Sends GET request to wit.ai to analyze the intent and entities of a message',

  inputs: {
    message: {
      type: 'string',
      description: 'message to be analyzed by wit',
      example: 'A sample message',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Wit message',
    },

  },


  fn: async function (inputs) {
    // Get wit message.
    let message = inputs.message;
    let url = 'https://api.wit.ai/message?v=20200513&q=' + encodeURIComponent(message);
    return axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + WIT_ACCESS_TOKEN
        }
    })
  }
};


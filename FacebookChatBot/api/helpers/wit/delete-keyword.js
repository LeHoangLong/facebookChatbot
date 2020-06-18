const axios = require('axios');

module.exports = {

  friendlyName: 'Delete keyword',


  description: '',


  inputs: {
    entity_name: {
      type: 'string',
      required: true
    },
    keyword: {
      type: 'string',
      required: true,
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let entity_name = inputs.entity_name;
    let keyword = inputs.keyword;
    keyword = encodeURIComponent(keyword);
    await axios.delete(`https://api.wit.ai/entities/${entity_name}/keywords/${keyword}`, {
      headers: {
        Authorization: 'Bearer ' + sails.config.token.WIT_ACCESS_TOKEN
      }
    }).catch(err => {
    	console.log(err.response);
    }); //first delete to ensure there is no duplicate error
  }


};


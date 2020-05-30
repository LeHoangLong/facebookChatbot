const axios = require('axios');

module.exports = {

  friendlyName: 'Create keyword',


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
    synonyms: {
      type: 'ref',
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
    let entity_name = inputs.entity_name;
    let keyword = inputs.keyword;
    let synonyms = inputs.synonyms;

    return await axios.post(`https://api.wit.ai/entities/${entity_name}/keywords?v=20200513`, {
      keyword : keyword,
      synonyms : synonyms,
    }, {
      headers: {
        Authorization: 'Bearer ' + sails.config.token.WIT_ACCESS_TOKEN
      }
    }).then(res => {
      console.log(res);
      return true;
    })

  }


};


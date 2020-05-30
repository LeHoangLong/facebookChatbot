const axios = require('axios');

module.exports = {
  friendlyName: 'Create entity from wit',


  description: '',


  inputs: {
    name: {
      type: 'string',
      required: true
    },
    roles: {
      type: 'ref',
      required: true
    },
    lookups: {
      type: 'ref',
      required: false,
      default: []
    },
    keywords: {
      type: 'ref',
      required: false,
      default: []
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    InvalidLookUpParams: {
      description: 'Lookups can only be free-text or keywords'
    }

  },


  fn: async function (inputs) {
    // TODO
    let name = inputs.name;
    let roles = inputs.roles;
    let lookups = inputs.lookups;
    let keywords = inputs.keywords;

    const allowed_lookup = ['free-text', 'keywords'];
    for (let i = 0; i < lookups.length; i++){
      if (!allowed_lookup.includes(lookups[i])){
        throw 'InvalidLookUpParams'
      }
    }
    
    await axios.post('https://api.wit.ai/entities?v=20200513', {
      name : name,
      roles : roles,
      lookup : lookup,
      keywords : keywords
    }).then(res => {
      console.log(res);
      return true;
    })

    return true;
  }


};


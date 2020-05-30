module.exports = {


  friendlyName: 'Query item info handler',


  description: '',


  inputs: {
    data: {
      type: 'ref',
      required: true
    },
    sender: {
      type: 'ref',
      required: true
    },
    context: {
      type: 'ref',
      required: false,
      defaultsTo: {}
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let data = inputs.data;
    let sender = inputs.sender;
    let context = inputs.context;
    const itemInfoHandlerMap = {
      trait_value_query_type_how_much: sails.helpers.facebook.queryItemInfoHowMuchHandler,
      trait_value_query_type_what: sails.helpers.facebook.queryItemInfoWhatHandler,
      trait_value_query_type_how_long: sails.helpers.facebook.queryItemInfoHowLongHandler
    }
    let trait_query_types = data.traits.trait_query_type;
    if (trait_query_types !== undefined){
      for (let i = 0; i < trait_query_types.length; i++){
        if (await itemInfoHandlerMap[trait_query_types[i].value].with({...inputs})){
          return true;
        }
      }
    }
    
    return false;
  }


};


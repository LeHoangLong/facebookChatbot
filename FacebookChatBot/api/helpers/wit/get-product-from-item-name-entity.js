module.exports = {


  friendlyName: 'Get product from item name entity',


  description: '',


  inputs: {
    entity_item_name: {
      type: 'ref',
      required: true
    },
    context: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Product from item name entity',
    },

  },


  fn: async function (inputs) {

    // Get product from item name entity.
    var productFromItemNameEntity;
    // TODO

    let entity_item_name = inputs.entity_item_name;
    let context = inputs.context;

    let product;
    if ('entities' in entity_item_name && entity_item_name.entities.length > 0){
      let category = '';
      let attribute = '';
      for (let j = 0; j < entity_item_name.entities.length; j++){
        let sub_entity = entity_item_name.entities[j];
        if (sub_entity.name == 'entity_category'){
          category = sub_entity.value;
        }else if (sub_entity.name == 'entity_attribute'){
          attribute = sub_entity.value;
        }
      }
      product = await sails.helpers.getProductFromContext.with({ category: category, attribute: attribute, context: context });
    }

    // Send back the result through the success exit.
    return product;

  }


};


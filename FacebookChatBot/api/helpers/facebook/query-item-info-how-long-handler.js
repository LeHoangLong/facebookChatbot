module.exports = {


  friendlyName: 'Query item info duration how long handler',


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
      type: 'json',
      required: false
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
    let entities = data.entities;
    let info_key_array = entities['entity_info_key:entity_info_key'];
    let item_context = entities['entity_context:role_item'];
    let entity_item_names = entities['Item:name'];
    let item_names = [];

    if (entity_item_names === undefined) {
      if (context.current_item_name === undefined || context.current_item_name === '') {
        //if no current item name in context, need to query user for item name
        await sails.helpers.facebook.queryItemName.with({ data: data, sender: sender, context: context })
        return true;
      }
      item_names = [context.current_item_name];
    } else {
      for (let i = 0; i < entity_item_names.length; i++) {
        item_names.push(entity_item_names[i].value);
      }
    }

    for (let i = 0; i < item_names.length; i++) {
      let reply = {};
      let item_name = item_names[i].toLowerCase();
      let product;
      //first search based on the context
      product = await sails.helpers.wit.getProductFromItemNameEntity.with({ entity_item_name: entity_item_names[i], context: context });

      if (product === undefined){
        product = await Product.findOne({ name: item_name });
      }
      if (product === undefined) {
        reply['text'] = `Sorry, we don't have item ${item_name}`
      } else {
        if (info_key_array !== undefined) {
          for (let j = 0; j < info_key_array.length; j++) {
            let info_key = info_key_array[j].value;
            let pattern = new RegExp(`^${info_key}:duration$`);
            let found = false;
            //user is asking about a key duration
            for (let j = 0; j < product.additionalInfo.length; j++) {
              let key = product.additionalInfo[j].key;
              let value = product.additionalInfo[j].value;
              let result = key.match(pattern);
              if (result) {
                reply['text'] = `${info_key} for item ${item_name} is ${value}`
                found = true;
                break;
              }
            }

            if (!found) {
              reply['text'] = `Sorry, I don't have any information about the duration of ${info_key} for item ${item_name}`
            }
          }
        } 
        await UserContext.update({ uid: sender['id'] }).set({ context: { ...context, current_item_name: item_name } });
      }
      await sails.helpers.facebook.replyToUser.with({ reply: reply, recipient: sender });
      return true;
    }
    return false;
  }


};


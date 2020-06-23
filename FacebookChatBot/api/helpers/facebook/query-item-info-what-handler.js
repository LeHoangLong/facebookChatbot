module.exports = {


  friendlyName: 'Query item info what handler',


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
    let info_key_detail_array = entities['entity_info_key_detail:entity_info_key_detail'];
    let item_context = entities['entity_context:role_item'];
    let entity_item_names = entities['Item:name'];
    let item_names = [];


    if (info_key_detail_array === undefined){
      info_key_detail_array = [];
    }

    if (info_key_array === undefined){
        //if no info key, it could be other types of query, so pass
        return false;
    }

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
    
    for (let k = 0; k < info_key_array.length; k++) { 
      for (let i = 0; i < item_names.length; i++){
        let reply = {};
        let info_key = info_key_array[k].value;
        let info_key_detail = info_key_detail_array[k];
        if (info_key_detail !== undefined){
          info_key_detail = info_key_detail.value;
        }
        let item_name = item_names[i].toLowerCase();

        let product_array = [];
        //first search based on the context
        if (entity_item_names !== undefined ){
          product_array = await sails.helpers.wit.getProductFromItemNameEntity.with({ entity_item_name: entity_item_names[i], context: context });
        }
        
        if (product_array.length === 0){
          let product = await Product.findOne({ name: item_name });
          if (product){
            product_array.push(product);
          }
        }

        if (product_array.length === 0) {
          reply['text'] = `Sorry, we don't have item ${item_name}`
        } else {
          for (let i = 0; i < product_array.length; i++){
            let product = product_array[i];
            item_name = product.name;
            if (info_key === 'price'){
              //asking what is price of item
              reply['text'] = `- Price of ${item_name} is ${product.price} ${product.currency}\n`
            }else{
              let pattern;
              if (info_key_detail === undefined){
                pattern = new RegExp(`^${info_key}$`);;
              }else{
                pattern = new RegExp(`^${info_key}:${info_key_detail}$`);
              }
              let found = false;
              for (let j = 0; j < product.additionalInfo.length ; j++){
                let key = product.additionalInfo[j].key;
                let value = product.additionalInfo[j].value;
                let result = key.match(pattern);
                if (result){
                  if (info_key_detail === undefined){
                    reply['text'] = `- ${info_key} for item ${item_name} is ${value}\n`
                  }else{
                    reply['text'] = `- ${info_key_detail} of ${info_key} for item ${item_name} is ${value}\n`
                  }
                  found = true;
                  break;
                }
              }
              
              if (!found){
                if (info_key_detail === undefined){
                  reply['text'] = `- Sorry, I don't have any information about ${info_key} for item ${item_name}\n`
                }else{
                  reply['text'] = `- Sorry, I don't have any information about ${info_key_detail} of ${info_key} for item ${item_name}\n`
                }
              }
            }
            await UserContext.update({uid: sender['id']}).set({context: {...context, current_item_name: item_name}});
            await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
          }
        }
      }
    };
    return true;
  }


};


module.exports = {


  friendlyName: 'Item info query how much handler',


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
    let info_key = entities['entity_info_key:entity_info_key'];
    let item_names = entities['Item:name'];

    if (item_names === undefined){
      if (context.current_item_name !== undefined || context.current_item_name === ''){
        //if no current item name in context, need to query user for item name
        await sails.helpers.facebook.queryItemName.with({ data: data, sender : sender, context: context })
        return true;
      }
      item_names = [context.current_item_name];
    }

    for (let i = 0; i < item_names.length; i++){
      let reply = {};
      let item_name = item_names[i].value.toLowerCase();
      let product = await Product.findOne({name: item_name});
      if (product === undefined){
        reply['text'] = `Sorry, we don't have item ${item_name}`
      }else{
        if (info_key !== undefined){
          let pattern = /(.*):price$/;
          let found = false;
          //user is asking about a key price
          for (let j = 0; j < product.additionalInfo.length ; j++){
            let key = product.additionalInfo[j].key;
            let value = product.additionalInfo[j].value;
            let result = key.match(pattern);
            if (result){
              let base_key_name = result[1];
              reply['text'] = `${base_key_name} for item ${item_name} is ${value}`
              found = true;
              break;
            }
          }

          if (!found){
            reply['text'] = `Sorry, I don't have any information about the price of ${base_key_name} for item ${item_name}`
          }
        }else{
          //user is asking about the item price
          let item_name = item_names[i].value.toLowerCase();
          reply['text'] = `${item_name} is ${product.price} ${product.currency}`
        }
        await UserContext.update({uid: sender['id']}).set({context: {...context, current_item_name: item_name}});
      }
      await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
      return true;

    }
    return false;
  }


};


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
    let item_names = entities['Item:name'];

    console.log('info_key');
    console.log(info_key_array);
    console.log('info_key_detail');
    console.log(info_key_detail_array);
    if (info_key_detail_array === undefined){
      info_key_detail_array = [];
    }

    if (info_key_array === undefined){
        //if no info key, it could be other types of query, so pass
        return false;
    }

    if (item_names === undefined){
      if (context.current_item_name === undefined || context.current_item_name === ''){
        //if no current item name in context, it could be other types of query, so pass
        return false;
      }
      item_names = [context.current_item_name]
    }else{
      for (let i = 0; i < item_names.length; i++) {
        item_names[i] = item_names[i].value;
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
        let product = await Product.findOne({name: item_name});
        if (info_key !== undefined){
          if (product === undefined){
            reply['text'] = `Sorry, we don't have item ${item_name}`
          }else{
            if (info_key === 'price'){
              //asking what is price of item
              reply['text'] = `Price of ${item_name} is ${product.price} ${product.currency}`
            }else{
              let pattern;
              if (info_key_detail === undefined){
                pattern = new RegExp(`^${info_key}$`);;
              }else{
                pattern = new RegExp(`^${info_key}:${info_key_detail}$`);
              }
              console.log('info_key_detail');
              console.log(info_key_detail);
              let found = false;
              for (let j = 0; j < product.additionalInfo.length ; j++){
                let key = product.additionalInfo[j].key;
                let value = product.additionalInfo[j].value;
                let result = key.match(pattern);
                if (result){
                  if (info_key_detail === undefined){
                    reply['text'] = `${info_key} for item ${item_name} is ${value}`
                  }else{
                    reply['text'] = `${info_key_detail} of ${info_key} for item ${item_name} is ${value}`
                  }
                  found = true;
                  break;
                }
              }
              
              if (!found){
                if (info_key_detail === undefined){
                  reply['text'] = `Sorry, I don't have any information about ${info_key} for item ${item_name}`
                }else{
                  reply['text'] = `Sorry, I don't have any information about ${info_key_detail} of ${info_key} for item ${item_name}`
                }
              }
            }
          }
          await UserContext.update({uid: sender['id']}).set({context: {...context, current_item_name: item_name}});
          await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
        }
      }
    };
    return true;
  }


};

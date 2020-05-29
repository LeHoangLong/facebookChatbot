module.exports = {


  friendlyName: 'Query item price handler',


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
    let entities = data['entities']
    let item_names = entities['Item:name'];
    let reply = {};
    console.log('data');
    console.log(data);
    if (item_names !== undefined){
      for (let i = 0; i < item_names.length; i++){
          let item_name = item_names[i].value.toLowerCase();
          let product = await Product.findOne({name: item_name});
          if (product === undefined){
            reply['text'] = `Sorry, we don't have item ${item_name}`
          }else{
            reply['text'] = `${item_name} is ${product.price} ${product.currency}`
            let sender_id = sender['id'];
            await UserContext.update({uid: sender_id}).set({context: {...context, current_item_name: item_name}});
          }
          await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
          //if (item_name in prices){
          //    reply['text'] = `${item_name} is ${prices[item_name]}`
          //}else{
          //}  
      }
    }else{
      //if no item names, check if there is context
      let item_context_list = entities['entity_context:role_item'];
      for (let i = 0; i < item_context_list.length ; i++){
        let item_context = item_context_list[i];
        if (item_context.value === 'current'){
          if ('current_item_name' in context && context['current_item_name'] !== ''){
            item_name = context['current_item_name']
            let product = await Product.findOne({name: item_name});
            if (product === undefined){
              reply['text'] = `Sorry, we don't have item ${item_name}`
            }else{
              reply['text'] = `${item_name} is ${product.price} ${product.currency}`
            }
            await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
          }else{
            await sails.helpers.facebook.queryItemName.with({ data: data, sender : sender, context: context })
          }
        }
      }
    }
  }


};


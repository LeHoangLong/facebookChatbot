module.exports = {


  friendlyName: 'Query item price handler',


  description: '',


  inputs: {
    data: {
      type: 'ref',
      required: false
    },
    sender: {
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
    let data = inputs.data;
    let sender = inputs.sender;
    let entities = data['entities']
    let item_names = entities['Item:name'];
    for (let i = 0; i < item_names.length; i++){
        let reply = {};
        let item_name = item_names[i].value.toLowerCase();
        let product = await Product.findOne({id: item_name});
        if (product === undefined){
          reply['text'] = `Sorry, we don't have item ${item_name}`
        }else{
          reply['text'] = `${item_name} is ${product.price} ${product.currency}`
        }
        await sails.helpers.facebook.replyToUser.with({reply: reply, recipient: sender});
        //if (item_name in prices){
        //    reply['text'] = `${item_name} is ${prices[item_name]}`
        //}else{
        //}  
    }
  }


};


module.exports = {


  friendlyName: 'Get product from context',


  description: '',


  inputs: {
    category: {
      type: 'string',
      required: true
    },
    attribute: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    context: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Product from context',
    },

  },


  fn: async function (inputs) {

    // Get product from context.
    var productFromContext;
    let category = inputs.category;
    let attribute = inputs.attribute;
    let context = inputs.context;
    let products = [];
    let included_product_name = [];
    //if no product, search in whether there is context of a post

    if ('post_context' in context){
      if ('items' in context['post_context']){
        let items = context['post_context']['items'];
        for (let j = 0; j < items.length; j++){
          if ( items[j].category === category && (items[j].attribute === attribute || attribute === '')){
            let product_name = items[j].product_name;
            if (!included_product_name.includes(product_name)){
              products.push(await Product.findOne({ name: product_name }));
              included_product_name.push(product_name);
            }
          }
        }
      }
    }

    return products;

    // TODO

    // Send back the result through the success exit.
    return productFromContext;

  }


};


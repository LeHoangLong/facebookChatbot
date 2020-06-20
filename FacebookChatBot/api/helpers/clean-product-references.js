module.exports = {


  friendlyName: 'Verify product references',


  description: '',


  inputs: {
    product_references: {
      type: 'ref',
      required: false,
      defaultsTo: []
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {
    // TODO
    console.log('cleaning product reference')
    let product_references = inputs.product_references;
    for (let i = 0; i < product_references.length; i++) {
      if ((await sails.helpers.validateString(product_references[i].category)) === true ) {
          product_references[i].category = product_references[i].category.toLowerCase();
      }else{
          return 'InvalidCategory';
      }
      if ((await sails.helpers.validateString(product_references[i].attribute, false)) === true) {
          product_references[i].attribute = product_references[i].attribute.toLowerCase();
      }else{
          return 'InvalidAttribute';
      }
      if ((await sails.helpers.validateString(product_references[i].product_name)) === true) {
          product_references[i].product_name = product_references[i].product_name.toLowerCase();
          if (!(await Product.findOne({name: product_references[i].product_name}))){
              //if there is no product with that name
              console.log('product not found');
              return 'ProductNotFound';
          }
      }else{
        return 'InvalidProductName';
      }
    }
    return product_references;
  }


};


module.exports = {


  friendlyName: 'Comment item handler',


  description: '',


  inputs: {
    value: {
      type: 'ref',
      required: true
    },
    welcome_sentence: {
      type: 'string',
      required: false,
      defaultsTo: "Hi, i'm Lee, your virtual assistant. How may i help you today?"
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    let value = inputs.value;
    let welcome_sentence = inputs.welcome_sentence;
    console.log('value');
    console.log(value);
    let facebook_post_id = value.post_id;
    console.log(facebook_post_id);
    let facebook_post = await FacebookPost.findOne({ id: facebook_post_id });
    let product_post = await ProductPost.findOne({ id: facebook_post.product_post });

    let product_references = product_post.product_references;

    let message = {
      text: ''
    }
    for (let i = 0; i < product_references.length; i++){
      let product = Product.findOne({ name: product_references[i] });
      console.log('product');
      console.log(product);
      message.text += `${product.name}: ${product.description}\n`
    }
    message.text += welcome_sentence;
    let recipient = {
      comment_id: value.comment_id
    }

    await sails.helpers.facebook.privateReplyToPost.with({ recipient: recipient, message: message});
  }


};


/**
 * FacebookPostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function(req, res){
      let content = req.body.content;
      let product_references = req.body.product_references;
      for (let i = 0; i < product_references; i++){
        if (await sails.helpers.validateString(product_references[i].category)){
          product_references[i].category = product_references[i].category.toLowerCase(); 
        }
        if (await sails.helpers.validateString(product_references[i].attribute, false)){
          product_references[i].attribute = product_references[i].attribute.toLowerCase(); 
        }
        if (await sails.helpers.validateString(product_references[i].product_name)){
          product_references[i].product_name = product_references[i].product_name.toLowerCase(); 
        }
      }
      product_post = await ProductPost.create({
        content: content,
        product_references: product_references
      }).fetch();
      
      return res.status(200).send(product_post);
  },

  update: async function (req, res) {
    let product_post_id = req.params['id'];
    let update_params = {};
    
    if ('content' in req.body){
      update_params['content'] = req.body.content;
    }

    if ('product_references' in req.body){
      let product_references = await sails.helpers.cleanProductReferences(req.body.product_references);
      if (typeof(product_references) === 'string'){
        return res.status(400).send(product_references);
      }
      update_params['product_references'] = product_references;
    }


    let post = await ProductPost.update({ id: product_post_id }).set(update_params).fetch();
    return res.status(200).send(post);
}
};


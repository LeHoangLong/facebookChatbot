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
  }

};


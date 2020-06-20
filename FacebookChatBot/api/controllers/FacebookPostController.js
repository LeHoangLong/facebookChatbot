/**
 * FacebookPostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        let content = req.body.content;
        let product_references = req.body.product_references;
        for (let i = 0; i < product_references; i++) {
            if (await sails.helpers.validateString(product_references[i].category)) {
                product_references[i].category = product_references[i].category.toLowerCase();
            }
            if (await sails.helpers.validateString(product_references[i].attribute, false)) {
                product_references[i].attribute = product_references[i].attribute.toLowerCase();
            }
            if (await sails.helpers.validateString(product_references[i].product_name)) {
                product_references[i].product_name = product_references[i].product_name.toLowerCase();
                if (!Product.findOne({name: product_references[i].product_name})){
                    //if there is no product with that name
                    return res.status(400).send('PRODUCT_NAME_DOES_NOT_EXIST');
                }
            }
        }
        product_post = await ProductPost.create({
            content: content,
            product_references: product_references
        }).fetch();

        if (product_post) {
            //create facebook
            let facebook_post_id = await sails.helpers.facebook.postToPage.with({ content: content });
            if (facebook_post_id) {
                await FacebookPost.create({
                    product_post: product_post.id,
                    facebook_post_id: facebook_post_id
                })
                //subscribe to facebook event
                return res.status(200).send(product_post);
            } else {
                return res.status(500).send('COULD_NOT_CREATE_FACEBOOK_POST');
            }
        } else {
            return res.status(500).send('COULD_NOT_CREATE_POST_IN_DATABASE');
        }
    },
};


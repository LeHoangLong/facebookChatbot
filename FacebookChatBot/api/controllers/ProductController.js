/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

async function validateAdditionalInfo(info){
    if (typeof(info) !== 'object'){
        return false;
    }

    for (let i = 0; i < info.length; i++){
        if (!(await sails.helpers.validateString(info[i].key))){
            return false;
        }
        if (!(await sails.helpers.validateString(info[i].value))){
            return false;
        }
    }
}

module.exports = {
    create: async function(req, res){
        let product_number = req.body.number;
        let product_name = req.body.name.toLowerCase();
        let product_price = parseInt(req.body.price);
        let product_currency = req.body.currency;
        let product_description = req.body.description;
        let additionalInfo = req.body.additionalInfo;
        if (!(await sails.helpers.validateString(product_number))){
            return res.status(400).send('INVALID_PRODUCT_NUMBER');
        }
        if (!(await sails.helpers.validateString(product_name))){
            return res.status(400).send('INVALID_PRODUCT_NAME');
        }
        if (typeof(product_price) !== 'number'){
            return res.status(400).send('INVALID_PRODUCT_PRICE');
        }
        if (!(await sails.helpers.validateString(product_description))){
            return res.status(400).send('INVALID_PRODUCT_DESCRIPTION');
        }
        if (!validateAdditionalInfo(additionalInfo)){
            return res.status(400).send('INVALID_ADDITIONAL_INFO');
        }
        let product;
        try {
            product = await Product.create({
                number: product_number,
                name : product_name,
                price : product_price,
                currency : product_currency,
                description : product_description,
                additionalInfo : additionalInfo,
            });
        } catch(e){
            if (e.code === 'E_UNIQUE'){
                return res.status(400).send('PRODUCT_NAME_OR_NUMBER_ALREADY_EXISTED');
            }else{
                return res.status(400).send('SERVER_ERROR');
            }
        }
        return res.status(200).send(product);
    }
};


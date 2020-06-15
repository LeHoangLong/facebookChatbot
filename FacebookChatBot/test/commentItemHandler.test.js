const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { stub } = require("sinon");

describe('Comment change event handler', function(){
    it('Comment content \'.\', should send a quick reply containing hello and items\' descriptions', async function(){
        let change_value = {
            "from": {
                "id": "test_user_id",
                "name": "Cinderella Hoover"
            },
            "item": "comment",
            "post_id": "test_post_id",
            "comment_id": "test_comment_id",
            "verb": "add",
            "created_time": 1520544814,
            "is_hidden": false,
            "message": "."
        }
        
        let fake_facebook_post = {
            facebook_post_id: 'test_post_id',
            product_post: 'test_product_post_id'
        }

        FacebookPost.findOne = sinon.stub();
        FacebookPost.findOne.returns(fake_facebook_post);

        let fake_product_post = {
            content: 'test content',
            product_references: ['product_1', 'product_2'],
        }

        ProductPost.findOne = sinon.stub();
        ProductPost.findOne.returns(fake_product_post);

        let fake_product_1 = {
            name: 'product_1',
            description: 'product 1 description',
        }

        let fake_product_2 = {
            name: 'product_2',
            description: 'product 2 description',
        }

        Product.findOne = sinon.stub();
        Product.findOne.onCall(0).returns(fake_product_1);
        Product.findOne.onCall(1).returns(fake_product_2);

        sails.helpers.facebook.privateReplyToPost = sinon.stub();
        sails.helpers.facebook.privateReplyToPost.with = sinon.stub();

        let expected_recipient = {
            comment_id: 'test_comment_id'
        }

        
        let expected_message = {
            text: ''
        }
        
        let welcome_message = 'test_welcome_message'
        expected_message.text += `${fake_product_1.name}: ${fake_product_1.description}\n`
        expected_message.text += `${fake_product_2.name}: ${fake_product_2.description}\n`
        expected_message.text += welcome_message
        

        await sails.helpers.facebook.commentItemHandler(change_value, welcome_message);
        sinon.assert.calledOnceWithExactly(FacebookPost.findOne, {id: 'test_post_id'});
        sinon.assert.calledOnceWithExactly(ProductPost.findOne, {id: 'test_product_post_id'});
        sinon.assert.calledWith(Product.findOne, { name: 'product_1' });
        sinon.assert.calledWith(Product.findOne, { name: 'product_2' });
        sinon.assert.calledOnceWithExactly(sails.helpers.facebook.privateReplyToPost.with, {
            recipient: expected_recipient,
            message: expected_message
        })
        
    })
})

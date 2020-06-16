const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { stub } = require("sinon");

describe('Comment change event handler', function(){
    it('Comment content \'.\' or \'ib\' or \'inbox\', should send a quick reply containing hello and items\' descriptions', async function(){
        let possible_comment_values = ['.', 'ib', 'inbox'];
        for (let i = 0; i < possible_comment_values.length ; i++){
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
                "message": possible_comment_values[i]
            }
            
            let fake_facebook_post = {
                facebook_post_id: 'test_post_id',
                product_post: 'test_product_post_id'
            }

            FacebookPost.findOne = sinon.stub();
            FacebookPost.findOne.returns(fake_facebook_post);

            let fake_product_post = {
                content: 'test content',
                product_references: [{
                    product_name: 'product_1'
                }, {
                    product_name: 'product_2'
                }],
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
        }
    });
    
    it('Other comments send to wit, update post context and call handleIntent helper', async function(){
        let possible_comment_values = ['How much is the blue hat', 'How much is the pants'];
        
        const wit_replies__ = [
            '{"text":"How much is the blue pants","intents":[{"id":"258905615223511","name":"query_info","confidence":0.9997}],"entities":{"Item:name":[{"id":"177739263597645","name":"Item","role":"name","start":16,"end":26,"body":"blue pants","confidence":0.9515,"entities":[{"id":"320023249021321","name":"entity_category","role":"entity_category","start":5,"end":10,"body":"pants","confidence":0.8826,"entities":[],"value":"pants","type":"value"},{"id":"264129251534804","name":"entity_attribute","role":"entity_attribute","start":0,"end":4,"body":"blue","confidence":0.8947,"entities":[],"value":"blue","type":"value"}],"value":"blue pants","type":"value"}]},"traits":{"trait_query_type":[{"id":"2671335633104108","value":"trait_value_query_type_how_much","confidence":0.9964}]}}',
            '{"text":"How much is the pants","intents":[{"id":"258905615223511","name":"query_info","confidence":0.9995}],"entities":{"Item:name":[{"id":"177739263597645","name":"Item","role":"name","start":16,"end":21,"body":"pants","confidence":0.9003,"entities":[{"id":"320023249021321","name":"entity_category","role":"entity_category","start":0,"end":5,"body":"pants","confidence":1,"entities":[],"value":"pants","type":"value"}],"value":"pants","type":"value"}]},"traits":{"trait_query_type":[{"id":"2671335633104108","value":"trait_value_query_type_how_much","confidence":0.9953}]}}',
        ]

        const wit_replies = [
            {
                data: 'test_reply_1',
            },{
                data: 'test_reply_2',
            }
        ]


        for (let i = 0; i < possible_comment_values.length ; i++){
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
                "message": possible_comment_values[i]
            }
            

            sails.helpers.facebook.getWitMessage = sinon.stub();
            sails.helpers.facebook.getWitMessage.with = sinon.stub();
            sails.helpers.facebook.getWitMessage.with.returns(wit_replies[i]);

            sails.helpers.facebook.handleIntent = sinon.stub();
            sails.helpers.facebook.handleIntent.with = sinon.stub();

            let fake_facebook_post = {
                facebook_post_id: 'test_post_id',
                product_post: 'test_product_post_id'
            }

            FacebookPost.findOne = sinon.stub();
            FacebookPost.findOne.returns(fake_facebook_post);

            let fake_product_post = {
                content: 'test content',
                product_references: [{
                    product_name: 'product_1'
                }, {
                    product_name: 'product_2'
                }],
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

            UserContext.findOrCreate = sinon.stub();
            UserContext.findOrCreate.returns({});
            UserContext.update = sinon.stub();
            const set_stub = sinon.stub(); 
            const fetch = sinon.stub();
            const fake_updated_context = {uid: 'test_user_id', context: { state: 'UPDATED'}}
            fetch.returns(fake_updated_context);
            set_stub.returns({
                fetch: fetch
            });
            UserContext.update.returns({
                set: set_stub
            });
            
            let expected_wit_message = possible_comment_values[i];

            let welcome_message = 'test_welcome_message';
            await sails.helpers.facebook.commentItemHandler(change_value, welcome_message);
            
            let expected_recipient = {
                comment_id: 'test_comment_id'
            }

            let expected_context = {
                post_context: {
                    items: [...fake_product_post.product_references]
                }
            }

            sinon.assert.calledOnceWithExactly(sails.helpers.facebook.getWitMessage.with, { message: expected_wit_message})
            sinon.assert.calledOnceWithExactly(sails.helpers.facebook.handleIntent.with, { data: wit_replies[i].data, sender: expected_recipient, context: fake_updated_context.context })
            sinon.assert.calledOnceWithExactly(UserContext.update, { uid: 'test_user_id' })
            sinon.assert.calledOnceWithExactly(set_stub, { context: {
                post_context: {
                    items: [
                        ...fake_product_post.product_references
                    ]
            }}})
        }
    })
    

})

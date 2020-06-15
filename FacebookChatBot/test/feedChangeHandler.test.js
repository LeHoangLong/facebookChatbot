const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const FacebookPost = require('../api/models/FacebookPost');
const ProductPost = require('../api/models/ProductPost');
const { stub } = require("sinon");

const feedChangHandler = require('../api/helpers/facebook/feed-change-handler');

describe('Feed change handler', function(){
    it('Comment add', async function(){
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
            "message": "It's Thursday and I want to eat cake."
        }
        let inputs = {
            change: change_value
        }
        
        sails.helpers.facebook.commentItemHandler = sinon.stub();

        await feedChangHandler.fn(inputs);
        sinon.assert.calledOnceWithExactly(sails.helpers.facebook.commentItemHandler, change_value);

    })
})

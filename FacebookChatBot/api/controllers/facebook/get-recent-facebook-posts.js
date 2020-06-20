module.exports = {


  friendlyName: 'Get recent facebook posts',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    // All done.
    let refresh = this.req.param("refresh", "false");
    if (refresh === 'true'){
      console.log('refresh true');
      let facebook_posts = await sails.helpers.facebook.getRecentPosts.with({ page_id : sails.config.token.FACEBOOK_PAGE_ID });
      let product_post_list = [];
      for (let i = 0; i < facebook_posts.length; i++){
        let facebook_post = await FacebookPost.findOne({ facebook_post_id: facebook_posts[i].id });
        if (facebook_post === undefined){
          let content = await sails.helpers.facebook.getPostContent.with({ post_id: facebook_posts[i].id });
          if (content){
            let product_post = await ProductPost.create({
              content: content.message,
              product_references: []
            }).fetch();
            await FacebookPost.create({
              facebook_post_id: facebook_posts[i].id,
              product_post: product_post.id
            })
            product_post_list.push(product_post);
          }
        }else{
          let product_post = await ProductPost.findOne({
            id: facebook_post.product_post
          })
          if (product_post){
            product_post_list.push(product_post);
          }
        }
      }
      return this.res.json(product_post_list);
    }else{
      console.log('refresh false');
      let product_posts = await ProductPost.find({
        where: {},
        limit: 20,
        sort: 'createdAt DESC'
      });
      return this.res.json(product_posts);
    }
  }


};

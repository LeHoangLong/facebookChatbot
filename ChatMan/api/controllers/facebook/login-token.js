

module.exports = {


  friendlyName: 'Login token',


  description: '',


  inputs: {

  },


  exits: {
    MissingTokenParamter: {
      statusCode: 400,
      description: 'Missing required \'token\' parameter in request body'
    },
    InvalidToken: {
      statusCode: 403,
      description: 'Invalid token'
    },
    MissingTokenParam: {
      statusCode: 400,
      description: 'Missing \'token\' parameter in request body'
    },
    MissingEmail: {
      statusCode: 400,
      description: 'Could not get user email from facebook'
    }
  },


  fn: async function (inputs) {
    let token = this.req.body['token'];
    if (token === undefined){
      throw "MissingTokenParamter"
    }
    let user_profile = await sails.helpers.facebook.getUserProfile.with({token: token});
    let email = user_profile['email'];
    let user = await User.findOne({ emailAddress: email });
    
    if (user === undefined){
      //if no other user, this is set to admin
      let user_count = await User.count();
      if (user_count === 0){
      //if (true){
        user = await User.create({ fullName: user_profile.name, emailAddress: user_profile.email, role: 'ADMIN', password: await sails.helpers.makePassword.with({password_length: 12})}).fetch();
      }else{
        res.status(404).send('USER_NOT_FOUND');    
      }
    }
    
    if (user !== undefined){
      let token_data = {
        uid: user.id,
      }
      let token = await sails.helpers.generateJwtToken.with({data: token_data, lifetime: 2 * 24 * 3600 });
      this.res.cookie('token', token, {
        httpOnly: true,
        signed: true
      })
      return 'LOGGED_IN';
      if (req.session.next !== undefined){
        //res.redirect(req.session.next);
      }else{
      }
    }
  }


};

/**
 * PassportController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var passport = require('passport');
var jwt = require('jsonwebtoken');

function makePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = {
  facebookAuth: function(req, res) {
    if ('next' in req.query){
      req.session.next = req.query['next'];
    }
    sails.log('req.session.next');
    sails.log(req.session.next);
    passport.authenticate('facebook', { scope: ['email']})(req, res);
  },

  facebookCallback: function(req, res) {
    passport.authenticate('facebook', async function(err, user_data) {
        var user = await User.findOne({ emailAddress: user_data.email });
        sails.log('req.session.next');
        sails.log(req.session.next);
        if (user === undefined){
            //if no other user, this is set to admin
            let user_count = await User.count();
            if (user_count === 0){
                let user = await User.create({ fullName: user_data.full_name, emailAddress: user_data.email, role: 'ADMIN', password: makePassword(12)}).fetch();
                req.session.userId = user.id;
                sails.log('req.session 1');
                sails.log(req.session);
                res.send('LOGGED_IN');
                if (req.session.next !== undefined){
                  //res.redirect(req.session.next);
                }else{
                }
            }else{
                res.status(404).send('USER_NOT_FOUND');    
            }
        }else{
            req.session.userId = user.id;
            sails.log('req.session 2');
            sails.log(req.session);
            res.send('LOGGED_IN');
            if (req.session.next !== undefined){
              //res.redirect(req.session.next);
            }else{
            }
        }
    })(req, res);
  },

};
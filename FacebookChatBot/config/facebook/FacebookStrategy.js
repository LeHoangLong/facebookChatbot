'use strict';

var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  request = require('request');



const FACEBOOK_CLIENT_ID = '241161500444353';
const FACEBOOK_APP_SECRET = '75010a994d7cd4b33de253de36e2bff0';

var verifyHandler = function(req, token, tokenSecret, profile, done) {
  process.nextTick(function() {
    var url = 'https://graph.facebook.com/v2.10/me?access_token=%s&fields=id,email,first_name,last_name';
    url = url.replace('%s', token);

    var options = {method: 'GET', url: url, json: true};
    var full_name = profile['_json'].name;
    request(options, function (err, response) {
      if (err) {
        return done(null, null);
      }

      var data = {
        id: response.body.id,
        first_name: response.body.first_name,
        last_name: response.body.last_name,
        email: response.body.email,
        full_name: full_name
      };

      return done(null, data);
    });
  });
};

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: '/api/v1/auth/facebook/callback',
  passReqToCallback: true
}, verifyHandler));


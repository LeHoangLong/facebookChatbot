/**
 * isAdmin
 *
 * A simple policy that blocks requests from non-admin.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
    // First, check whether the request comes from a logged-in user.
    // > For more about where `req.me` comes from, check out this app's
    // > custom hook (`api/hooks/custom/index.js`).

    sails.log('is token admin');
    let token = req.signedCookies.token;
    if (token === undefined){
      return res.status(400).send('MISSING_TOKEN');
    }

    let decoded = await sails.helpers.decodeJwtToken(token);

    if ('uid' in decoded){
      let user = await User.findOne({id: decoded.uid});
      if (user === undefined){
        return res.status(403).send('USER_NOT_FOUND');
      }else{
        if (user.role !== 'ADMIN'){
          return res.status(403).send('USER_DOES_NOT_HAVE_PERMISSION');
        }else{
          return proceed();
        }
      }
    }else{
      return res.status(400).send('INVALID_TOKEN');
    }
  
  };
  
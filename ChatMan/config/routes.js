/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const urls = require('./urls').urls;
const ROUTER_PREFIX = urls.ROUTER_PREFIX; 
const STATIC_FILE_URL = urls.STATIC_FILE_URL;
const serverStatic = require('serve-static');

module.exports.routes = {
  [`${STATIC_FILE_URL}/js/*`]: serverStatic('/home/long/hackathons/FacebookChatBot/ChatMan/assets', {skipAssets: true}),
  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  [`GET ${ROUTER_PREFIX}/`]:                   { action: `main-page` },
  [`GET ${ROUTER_PREFIX}/welcome/:unused?`]:   { action: `dashboard/view-welcome` },

  [`GET ${ROUTER_PREFIX}/faq`]:                { action:   `view-faq` },
  [`GET ${ROUTER_PREFIX}/legal/terms`]:        { action:   `legal/view-terms` },
  [`GET ${ROUTER_PREFIX}/legal/privacy`]:      { action:   `legal/view-privacy` },
  [`GET ${ROUTER_PREFIX}/contact`]:            { action:   `view-contact` },

  [`GET ${ROUTER_PREFIX}/signup`]:             { action: `entrance/view-signup` },
  [`GET ${ROUTER_PREFIX}/email/confirm`]:      { action: `entrance/confirm-email` },
  [`GET ${ROUTER_PREFIX}/email/confirmed`]:    { action: `entrance/view-confirmed-email` },

  //`GET /login`:              { action: `entrance/view-login` },
  [`GET ${ROUTER_PREFIX}/password/forgot`]:    { action: `entrance/view-forgot-password` },
  [`GET ${ROUTER_PREFIX}/password/new`]:       { action: `entrance/view-new-password` },

  [`GET ${ROUTER_PREFIX}/account`]:            { action: `account/view-account-overview` },
  [`GET ${ROUTER_PREFIX}/account/password`]:   { action: `account/view-edit-password` },
  [`GET ${ROUTER_PREFIX}/account/profile`]:    { action: `account/view-edit-profile` },


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  [`${ROUTER_PREFIX}/terms`]:                   `/legal/terms`,
  [`${ROUTER_PREFIX}/logout`]:                  `/api/v1/account/logout`,


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …

  [`GET ${ROUTER_PREFIX}/webhook`]: { action: `facebook/facebook-webhook-verify`},
  [`POST ${ROUTER_PREFIX}/webhook`]: { action: `facebook/event-handler`, csrf: false},


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  [`${ROUTER_PREFIX}/api/v1/account/logout`]:                           { action: `account/logout` },
  [`PUT   ${ROUTER_PREFIX}/api/v1/account/update-password`]:            { action: `account/update-password` },
  [`PUT   ${ROUTER_PREFIX}/api/v1/account/update-profile`]:             { action: `account/update-profile` },
  [`PUT   ${ROUTER_PREFIX}/api/v1/account/update-billing-card`]:        { action: `account/update-billing-card` },
  [`PUT   ${ROUTER_PREFIX}/api/v1/entrance/login`]:                        { action: `entrance/login` },
  [`POST  ${ROUTER_PREFIX}/api/v1/entrance/signup`]:                       { action: `entrance/signup` },
  [`POST  ${ROUTER_PREFIX}/api/v1/entrance/send-password-recovery-email`]: { action: `entrance/send-password-recovery-email` },
  [`POST  ${ROUTER_PREFIX}/api/v1/entrance/update-password-and-login`]:    { action: `entrance/update-password-and-login` },
  [`POST  ${ROUTER_PREFIX}/api/v1/deliver-contact-form-message`]:          { action: `deliver-contact-form-message` },

  [`GET ${ROUTER_PREFIX}/login`]: { action: `facebook/login-token` }, //default login method

  [`GET ${ROUTER_PREFIX}/check_login`]: { action: `check-login` },
  [`POST ${ROUTER_PREFIX}/facebook_login_token`]: { action: `facebook/login-token` },

  [`GET ${ROUTER_PREFIX}/csrftoken`]: { action: `security/grant-csrf-token` },

  [`GET ${ROUTER_PREFIX}/pending_conversations`]: { action: `get-pending-conversations` },
  [`GET ${ROUTER_PREFIX}/messages`]: { action: `get-messages-of-conversation` },
  [`POST ${ROUTER_PREFIX}/messages`]: { action: `create-message` },
  [`GET ${ROUTER_PREFIX}/conversations`]: { action: `get-conversation` },
  [`POST ${ROUTER_PREFIX}/conversations`]: { action: `join-conversation` },
  [`DELETE ${ROUTER_PREFIX}/conversations`]: { action: `close-conversation` },
  
  //[`GET ${urls.FACEBOOK_POST_COMMENT_EVENT_CALLBACK_URL}`]: { action: `facebook/page-event-webhook-verify` },
  //[`POST ${urls.FACEBOOK_POST_COMMENT_EVENT_CALLBACK_URL}`]: { action: `facebook/page-event-webhook` }
};

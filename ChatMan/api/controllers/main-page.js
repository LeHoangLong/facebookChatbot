module.exports = {


  friendlyName: 'Main page',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/main_page'
    },
  },


  fn: async function (inputs) {

    // All done.
    return{
      root_path: `${sails.config.urls.JS_SCRIPT_URL}/main.js`
    };

  }


};

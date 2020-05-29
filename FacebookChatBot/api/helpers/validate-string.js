module.exports = {


  friendlyName: 'Validate string',


  description: 'Validate whether a string contains harmful character such as <,>',


  inputs: {
    input: {
      type: 'string',
      required: false
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let pattern = /[<>]/;
    let input = inputs.input;
    if (input.search(pattern) === -1 && input.length > 0){
      //no unescaped character
      return true;
    }else{
      return false;
    }

  }


};


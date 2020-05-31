module.exports = {


  friendlyName: 'Validate string',


  description: 'Validate whether a string contains harmful character such as <,>',


  inputs: {
    input: {
      type: 'string',
      required: false
    },
    isLengthChecked: {
      type: 'boolean',
      required: false,
      default: true
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
    let isLengthChecked = inputs.isLengthChecked;
    if (input.search(pattern) === -1 && (input.length > 0 || isLengthChecked === false)){
      //no unescaped character
      return true;
    }else{
      return false;
    }

  }


};


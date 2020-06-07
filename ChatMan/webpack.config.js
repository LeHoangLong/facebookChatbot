module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ["babel-loader"]
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: 'file-loader'
        }
      ]
    }
};
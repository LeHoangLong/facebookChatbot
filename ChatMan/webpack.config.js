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
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
                disable: true, 
              },
            },
          ]
        },
        {
          test: /\.mp3$/,
          use: 'file-loader'
        }
      ]
    }
};
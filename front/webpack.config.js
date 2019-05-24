const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
  });

  const environmentPlugin = new webpack.EnvironmentPlugin(env);

  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname)
      },
      extensions: ['*', '.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'file-loader'
          }]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [{
            loader: 'file-loader'
          }]
        }
      ]
    },
    devServer: {
      hot: false,
      inline: false,
      historyApiFallback: true,
      stats: 'minimal'
    },
    plugins: [htmlPlugin, environmentPlugin]
  };
};

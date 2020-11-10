const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PUBLIC_PATH = {
  PROD: '/hugging-face/',
  DEV: '/',
};

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';
  const publicPath = isProduction ? PUBLIC_PATH.PROD : PUBLIC_PATH.DEV;

  return {
    output: {
      publicPath,
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [{ loader: 'ts-loader' }],
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            'postcss-loader',
          ],
        },
        {
          test: /\.(woff(2)?|(o|t)tf|eot|png|jpg|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
      }),
      new MiniCssExtractPlugin(),
    ],
    devServer: {
      contentBase: __dirname + '/public',
      publicPath,
    },
  };
};

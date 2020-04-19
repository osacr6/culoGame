const path = require('path');
const glob = require('glob');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  watch: true,
  entry: getSrcFiles(),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          //{loader: 'eslint-loader'},
          {
            loader: 'babel-loader', 
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('./client'),
    }
  },

  plugins: [
     // remove deleted src files from the build folder
    new CleanWebpackPlugin(),
    // Optimizely validator workaround
    new ReplaceInFileWebpackPlugin(
      [{
        dir: 'build',
        test: /\.bundle.js$/,
        rules: [
          {
            search: /\.default(?=[^\w$])/g,
            replace: "['default']"
          },
          {
            search: /^/,
            replace: "/* jshint ignore:start */\n"
          },
          {
            search: /$/,
            replace: "\n/* jshint ignore:end */"
          }
        ]
      }]
    )
  ]
};


function getSrcFiles() {
  return glob.sync('./client/*.js').reduce((acc, item) => {
    const name = item.replace('./client/', '').replace('.js', '');
    acc[name] = item;
    return acc;
  }, {});
}

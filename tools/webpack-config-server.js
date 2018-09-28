// prettier-ignore
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const config = require('./config');

module.exports = {
  entry: './src/server/index',

  output: {
    path: path.join(config.webpack.path.build),
    filename: 'server.bundle.js',
    publicPath: ''
  },

  target: 'node', // in order to ignore built-in modules like path, fs, etc.

  node: {
    __filename: true,
    __dirname: true
  },

  externals: [
    nodeExternals({
      importType: 'commonjs'
    })
  ], // in order to ignore all modules in node_modules folder
  resolve: {
    alias: {
      react: 'anujs/dist/ReactIE.js',
      'react-dom': 'anujs/dist/ReactIE.js',
      'prop-types': 'anujs/lib/ReactPropTypes.js',
      'create-react-class': 'anujs/lib/createClass.js',
      'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',
      rematch: 'anujs/dist/Rematch.js',
      // router: 'anujs/dist/Router.js',
      redux: 'anujs/lib/ReduxIE.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015-loose', 'react'],
              plugins: [
                'transform-class-properties',
                [
                  'transform-es2015-classes',
                  {
                    loose: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'null-loader' }]
      },
      {
        test: /\.less$/,
        use: [{ loader: 'null-loader' }]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: [{ loader: 'null-loader' }]
      }
    ]
  }
};
